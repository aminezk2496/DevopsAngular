# Étape de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape de production avec NGINX
FROM nginx:alpine
COPY --from=build /app/dist/projet-angular17 /usr/share/nginx/html
