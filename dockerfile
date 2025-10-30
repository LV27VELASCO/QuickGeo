# Stage 1: Build Angular app with SSR
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build Angular app + SSR
RUN npm run build

# Stage 2: Run SSR app
FROM node:20-alpine

WORKDIR /app

# Copiar build y dependencias
COPY --from=builder /app/dist/fungeo-clone ./dist/fungeo-clone
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Variables de entorno
ENV PORT=4000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 4000

# Ejecutar servidor SSR
CMD ["node", "dist/fungeo-clone/server/server.mjs"]
