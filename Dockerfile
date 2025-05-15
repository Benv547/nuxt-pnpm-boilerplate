# Utiliser l'image Node officielle en tant qu'image de base
FROM node:20-alpine as builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et pnpm-lock.yaml pour le frontend et le backend
COPY apps/frontend/package.json apps/backend/package.json pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Installer Python
RUN apk add --no-cache python3

# Installer Make
RUN apk add --no-cache make

# Installer pnpm
RUN npm install -g pnpm

# Copier les fichiers du frontend
COPY apps/frontend ./apps/frontend

# Copier les fichiers du backend
COPY apps/backend ./apps/backend

# Copier les fichiers du web
COPY apps/web ./apps/web

# Installer les dépendances
RUN pnpm install

# Construire le frontend
RUN pnpm --filter frontend generate

# Construire le backend
RUN pnpm --filter backend build

# Utiliser l'image Ngix officielle pour la production
FROM nginx:alpine

# Installer npm
RUN apk add --no-cache npm

# Copier les fichiers de configuration Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Test NGINX configs
RUN nginx -t

# Copier les fichiers du frontend
COPY --from=builder /app/apps/frontend/.output/public /usr/share/nginx/html/app

# Copier les fichiers du web
COPY --from=builder /app/apps/web/www /usr/share/nginx/html

# Copier les fichiers du backend
COPY --from=builder /app/apps/backend/build /app

WORKDIR /app

# Installer les dépendances
# RUN npm install --production

ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=::
ENV LOG_LEVEL=info

# Exposer le port 80 et 3333 et 3456
EXPOSE 3000 3333 3456

# Install python3
RUN apk add --no-cache python3
# Install make
RUN apk add --no-cache make

RUN npm install @vinejs/vine@latest
RUN npm update
RUN npm install

# Démarrer Nginx et le backend
CMD ["/bin/sh", "-c", "npm run migration:run:force & npm run start & nginx -g 'daemon off;'"]
