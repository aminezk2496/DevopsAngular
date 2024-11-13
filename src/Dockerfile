# Étape 1 : Construction de l'application Angular
FROM node:20 AS build

WORKDIR /app

# Installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le code source de l'application Angular
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Serveur HTTP pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits de l'étape précédente
COPY --from=build dist/projet-angular17 /usr/share/nginx/html   

# Exposer le port 80 pour accéder à l'application
EXPOSE 8082

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
