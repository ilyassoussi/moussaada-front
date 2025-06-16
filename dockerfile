# Create an Image
FROM node:18-alpine AS stage1

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@9.2.0
# RUN npm install
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Étape 2 : Utilisation d'une image Nginx pour servir l'application React
FROM nginx:alpine
# Copier les fichiers build vers Nginx
COPY --from=stage1 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]