# FROM nginx:alpine
# COPY index.html /usr/share/nginx/html/index.html
# COPY style.css /usr/share/nginx/html/style.css
# COPY script.js /usr/share/nginx/html/script.js
# EXPOSE 80

FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]