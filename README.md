Expedição Numerix — Caça ao Tesouro Matemático

📚 Sobre o projeto

O Expedição Numerix é um jogo educativo desenvolvido em Flask para ajudar estudantes do 6º ao 9º ano a praticarem matemática de forma divertida. Cada série tem desafios específicos, cobrindo desde números e frações até funções e estatística.

🚀 Funcionalidades

Escolha da série (6º ao 9º ano).

Conteúdos adaptados para cada nível escolar.

Interface responsiva e amigável.

Deploy automático no Render.

Favicon personalizado para identidade visual.

🛠️ Tecnologias utilizadas

Python

Flask

HTML e CSS

Gunicorn (produção no Render)

Waitress (execução local no Windows)

📦 Instalação local

Clone o repositório:

git clone https://github.com/seuusuario/expedicao_numerix_projeto.git
cd expedicao_numerix_projeto

Crie o ambiente virtual:

python -m venv venv
venv\Scripts\activate

Instale as dependências:

pip install -r requirements.txt

Execute o servidor local:

python app.py

O jogo estará disponível em:

http://127.0.0.1:5000

🌐 Deploy no Render

O projeto está configurado para deploy automático via GitHub.

Build Command:

pip install -r requirements.txt

Start Command:

gunicorn app:app

Após cada git push, o Render reconstrói e publica o app.

URL pública:

https://expedicao-numerix.onrender.com

🎨 Personalização

O favicon está em static/favicon.png.

Para trocar, basta substituir o arquivo e atualizar o HTML:

<link rel="icon" type="image/png" href="{{ url_for('static', filename='favicon.png') }}">

🤝 Contribuição

Faça um fork do projeto.

Crie uma branch para sua feature:

git checkout -b minha-feature

Commit suas alterações:

git commit -m "Adiciona minha feature"

Push para a branch:

git push origin minha-feature

Abra um Pull Request.

📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e compartilhar.