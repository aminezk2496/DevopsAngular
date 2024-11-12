# Étape 1 : Construire l'application Angular
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers et construire l'application Angular
COPY . .
RUN npm run build --prod

# Étape 2 : Préparer le serveur Nginx pour déployer l'application
FROM nginx:alpine

# Copier les fichiers de build d'Angular dans le répertoire par défaut de Nginx
COPY --from=build /app/dist/ProjetAngular17 /usr/share/nginx/html

# Exposer le port 80
EXPOSE 8287

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
