nohup gunicorn --bind 0.0.0.0:8000 --log-level debug wsgi:app &
