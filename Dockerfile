# Étape 1: Build de l'application Next.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
# Utiliser npm install pour s'assurer que toutes les dépendances sont installées
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers
COPY . .

# Construire l'application Next.js
RUN npm run build

# Étape 2: Image de production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

