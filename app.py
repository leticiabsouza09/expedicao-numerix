import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    if os.name == "nt":  # Windows
        from waitress import serve
        serve(app, host="0.0.0.0", port=5000)
    else:  # Linux (Render)
        port = int(os.environ.get("PORT", 5000))
        app.run(host="0.0.0.0", port=port)
