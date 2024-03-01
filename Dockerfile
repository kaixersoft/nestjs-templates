FROM node:18-slim AS builder

WORKDIR /package
COPY package*.json ./

RUN npm install

COPY . .

# Build specific app
RUN npm run build bullboard

# Final image
FROM node:18-slim AS release

WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production

COPY . .

COPY --from=builder /package/dist ./dist

EXPOSE 3100

CMD ["npm", "run", "start:prod"]