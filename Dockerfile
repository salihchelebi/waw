FROM node:20-alpine

RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    build-base \
    cairo-dev \
    pango-dev \
    chromium \
    curl && \
    npm install -g pnpm

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_OPTIONS=--max-old-space-size=8192

WORKDIR /usr/src/flowise

RUN addgroup -S nodejs && adduser -S node -G nodejs
RUN chown -R node:node /usr/src/flowise
USER node

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY --chown=node:node packages/server/package.json packages/server/package.json
COPY --chown=node:node packages/ui/package.json packages/ui/package.json
COPY --chown=node:node packages/components/package.json packages/components/package.json
COPY --chown=node:node packages/api-documentation/package.json packages/api-documentation/package.json

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

RUN pnpm build

EXPOSE 3000
CMD ["node", "scripts/render-start.js"]