# Utiliser une image Python officielle (3.9 slim pour éviter une image trop grosse)
FROM python:3.9-slim

# Pour que Python ne bufferise pas les logs (utile en container)
ENV PYTHONUNBUFFERED=1

# Installer des dépendances système si besoin (ex: pour certaines lib comme numpy / pandas / etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du repo dans le container
COPY . /app

# Installer les dépendances Python
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Exposer le port sur lequel le service tourne (5002)
EXPOSE 5002

# Commande de lancement — on passera les variables d’environnement au docker run
CMD ["python", "-m", "argumentation_analysis.services.web_api.app"]

