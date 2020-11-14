from main import app

if __name__ == "__main__":
    app.run()
    
# Comando para iniciar a aplicação:
#---> gunicorn --bind 0.0.0.0:8000 --log-level debug wsgi:app