# ── Étape 1 : Build ──────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /home/soslock/frontend/app

# Copie les dépendances en premier (cache Docker)
COPY package.json package-lock.json ./
RUN npm install

# Copie le reste du code
COPY . .

# Build Vite → génère le dossier dist/
RUN npm run build

# ── Étape 2 : Serve ──────────────────────────────────────────────
FROM nginx:alpine AS runner

# Copie uniquement le dist/ depuis l'étape builder
COPY --from=builder /home/soslock/frontend/app/dist /usr/share/nginx/html

# Config nginx pour React Router (SPA - gère les routes côté client)
RUN echo 'server { \
  listen 80; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]