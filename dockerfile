# Stage 1: Build Angular app with SSR
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build Angular app + SSR
RUN npm run build:ssr

# Stage 2: Run SSR app
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/fungeo-clone /app/dist/fungeo-clone
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node", "dist/fungeo-clone/server/server.mjs"]
