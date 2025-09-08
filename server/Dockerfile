# Stage 1: Build the app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies (clean, reproducible install)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the NestJS app
RUN npm run build


# Stage 2: Run the app (smaller image)
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment variable
ENV NODE_ENV=production

# Expose app port (taken from .env)
EXPOSE ${PORT}

# Run the app
CMD ["node", "dist/main.js"]
