FROM node:alpine as base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY pnpm-lock.yaml ./ package.json ./
RUN npm install -g pnpm && pnpm install

FROM base as builder
WORKDIR /app
COPY . .
RUN pnpm run build

FROM base as production
ENV NODE_ENV=production
WORKDIR /app
RUN pnpm install

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder . .

EXPOSE 3000
ENV HOST=0.0.0.0

CMD npm start
     