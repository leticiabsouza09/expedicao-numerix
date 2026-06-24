import os
import threading
from datetime import datetime, timezone

from flask import Flask, render_template, request, jsonify
import libsql_client

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Banco de dados (Turso / libSQL)
#
# Em produção (Render), defina as variáveis de ambiente:
#   TURSO_DATABASE_URL = libsql://seu-banco.turso.io
#   TURSO_AUTH_TOKEN    = <token gerado no dashboard/CLI do Turso>
#
# Sem essas variáveis, o app cai automaticamente para um arquivo SQLite
# local (ranking_local.db), útil para desenvolver na sua máquina sem
# precisar de conta no Turso.
# ---------------------------------------------------------------------------
TURSO_URL = os.environ.get("TURSO_DATABASE_URL")
TURSO_AUTH_TOKEN = os.environ.get("TURSO_AUTH_TOKEN")

if TURSO_URL:
    db_client = libsql_client.create_client_sync(
        url=TURSO_URL,
        auth_token=TURSO_AUTH_TOKEN,
    )
    print("Conectado ao Turso (banco remoto).")
else:
    local_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ranking_local.db")
    db_client = libsql_client.create_client_sync(url=f"file:{local_path}")
    print(f"TURSO_DATABASE_URL não definida — usando SQLite local em {local_path}")

# O client síncrono roda um loop assíncrono numa thread de fundo;
# usamos um lock para evitar chamadas concorrentes problemáticas no Flask
# (que por padrão atende requisições em múltiplas threads).
db_lock = threading.Lock()


def db_execute(sql, args=None):
    with db_lock:
        return db_client.execute(sql, args or [])


def rows_to_dicts(result_set):
    return [dict(zip(result_set.columns, row)) for row in result_set.rows]


def init_db():
    db_execute(
        """
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            turma TEXT DEFAULT '',
            grade TEXT NOT NULL,
            island_id TEXT,
            gems INTEGER NOT NULL DEFAULT 0,
            correct INTEGER NOT NULL DEFAULT 0,
            total INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL
        )
        """
    )


# ---------------------------------------------------------------------------
# Rotas de páginas
# ---------------------------------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")


# ---------------------------------------------------------------------------
# API
# ---------------------------------------------------------------------------
@app.route("/api/score", methods=["POST"])
def save_score():
    """Registra o resultado de uma rodada (ilha concluída)."""
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()[:40]
    turma = str(data.get("turma", "")).strip()[:40]
    grade = str(data.get("grade", "")).strip()[:10]
    island_id = str(data.get("island_id", "")).strip()[:60]
    gems = int(data.get("gems", 0) or 0)
    correct = int(data.get("correct", 0) or 0)
    total = int(data.get("total", 0) or 0)

    if not name or not grade:
        return jsonify({"ok": False, "error": "name e grade são obrigatórios"}), 400

    db_execute(
        """
        INSERT INTO scores (name, turma, grade, island_id, gems, correct, total, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        [name, turma, grade, island_id, gems, correct, total,
         datetime.now(timezone.utc).isoformat()],
    )
    return jsonify({"ok": True})


@app.route("/api/ranking/<grade>", methods=["GET"])
def ranking_by_grade(grade):
    """
    Ranking individual: melhor pontuação acumulada (MAX de gems numa única
    sessão registrada) por jogador, dentro de uma série.
    Aceita ?turma=Nome+da+turma para filtrar só uma turma.
    """
    turma = request.args.get("turma", "").strip()
    limit = min(int(request.args.get("limit", 20)), 100)

    if turma:
        rs = db_execute(
            """
            SELECT name, turma, MAX(gems) AS best_gems,
                   SUM(correct) AS total_correct, SUM(total) AS total_questions
            FROM scores
            WHERE grade = ? AND turma = ?
            GROUP BY name, turma
            ORDER BY best_gems DESC
            LIMIT ?
            """,
            [grade, turma, limit],
        )
    else:
        rs = db_execute(
            """
            SELECT name, turma, MAX(gems) AS best_gems,
                   SUM(correct) AS total_correct, SUM(total) AS total_questions
            FROM scores
            WHERE grade = ?
            GROUP BY name, turma
            ORDER BY best_gems DESC
            LIMIT ?
            """,
            [grade, limit],
        )

    return jsonify({"ok": True, "grade": grade, "ranking": rows_to_dicts(rs)})


@app.route("/api/ranking/<grade>/turmas", methods=["GET"])
def ranking_by_turma(grade):
    """Ranking agregado por turma (soma das melhores pontuações de cada aluno)."""
    rs = db_execute(
        """
        SELECT turma, SUM(best_gems) AS turma_total, COUNT(*) AS alunos
        FROM (
            SELECT name, turma, MAX(gems) AS best_gems
            FROM scores
            WHERE grade = ? AND turma != ''
            GROUP BY name, turma
        )
        GROUP BY turma
        ORDER BY turma_total DESC
        LIMIT 50
        """,
        [grade],
    )
    return jsonify({"ok": True, "grade": grade, "ranking": rows_to_dicts(rs)})


init_db()

if __name__ == "__main__":
    if os.name == "nt":  # Windows
        from waitress import serve
        print("Servidor rodando com Waitress em http://127.0.0.1:5000")
        serve(app, host="0.0.0.0", port=5000)
    else:  # Linux (Render)
        port = int(os.environ.get("PORT", 5000))
        print(f"Servidor rodando em porta {port}")
        app.run(host="0.0.0.0", port=port)