# -------- Stage 1: Build Stage --------
FROM node:18-alpine AS builder

WORKDIR /app

COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production

# -------- Stage 2: Runtime Stage --------
FROM node:18-alpine

WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Copy backend and frontend code
COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "server.js"]
