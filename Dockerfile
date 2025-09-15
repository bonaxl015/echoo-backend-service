# ----------------------------
#   Builder stage
# ----------------------------
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN rm -rf node_modules/**/docs node_modules/**/*.md

# Copy all files
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Generate prisma client
RUN npx prisma generate

# Build the app
RUN yarn build

# ----------------------------
#   Production stage
# ----------------------------
FROM node:20-slim AS production

# Set environment
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Install openssl
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Regenerate prisma client after openssl installation
RUN npx prisma generate

# Expose API port
EXPOSE 5051

# Use a non-root user for security
USER node

#  Start application
CMD ["node", "dist/server.js"]
