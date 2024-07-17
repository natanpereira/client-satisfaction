FROM node:20

# Instala pnpm globalmente
RUN npm install -g pnpm

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do pnpm
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install

# Copia todos os arquivos para o contêiner
COPY . .

# Copia o arquivo .env.example para .env
COPY .env.example ./.env

# Constrói a aplicação
RUN pnpm run build

# Define a variável de ambiente NODE_ENV para produção
ENV NODE_ENV=production

# Expõe a porta 3000
EXPOSE 3000

# Define o comando de inicialização
CMD ["node", "dist/main.js"]
