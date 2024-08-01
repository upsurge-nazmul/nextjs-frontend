# Install dependencies only when needed
FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

ENV NODE_ENV production
ENV NEXT_PUBLIC_LIVE_SERVER='https://server-g5bprkvzla-uc.a.run.app/'
ENV NEXT_PUBLIC_TEST_SERVER='https://server-g5bprkvzla-uc.a.run.app/'
ENV NEXT_PUBLIC_MEDIA_BUCKET='https://storage.googleapis.com'
ENV NEXT_PUBLIC_GAME_BUCKET='https://storage.googleapis.com'

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
