# syntax=docker/dockerfile:1

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install root and client dependencies
COPY package*.json ./
COPY client/package*.json ./client/
RUN npm ci && npm ci --prefix client

# Copy source
COPY . .

# Build React client
RUN npm run build --prefix client

# Prune dev dependencies for production
RUN npm prune --omit=dev && npm cache clean --force

# Runtime stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy app from builder
COPY --from=builder /app /app

EXPOSE 5000

CMD ["node", "server.js"]
