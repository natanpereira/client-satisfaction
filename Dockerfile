FROM node:20

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

COPY .env.example ./.env

RUN pnpm run build

ENV NODE_ENV=production

EXPOSE 3000

# CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:dev"]
