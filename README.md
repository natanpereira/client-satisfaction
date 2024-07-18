# Projeto NestJS com TypeORM e PostgreSQL

Este projeto é uma aplicação de exemplo NestJS que utiliza o TypeORM para interações com o banco de dados PostgreSQL. Ele inclui Swagger para documentação da API e Docker Compose para containerizar a aplicação e o banco de dados. Além disso, possui testes unitários escritos com Jest.

## Sumário

1. [Instalação](#instalação)
2. [Executando a Aplicação](#executando-a-aplicação)
3. [Documentação da API com Swagger](#documentação-da-api-com-swagger)
4. [Configuração com Docker](#configuração-com-docker)
5. [Executando Testes Unitários](#executando-testes-unitários)

## Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/natanpereira/client-satisfaction.git
    cd client-satisfaction
    ```

2. **Instale as dependências usando pnpm:**

    ```bash
    pnpm install
    ```

3. **Crie um arquivo `.env` baseado no arquivo `.env.example` e atualize as variáveis de ambiente necessárias:**

    ```bash
    cp .env.example .env
    ```

## Executando a Aplicação

1. **Inicie a aplicação:**

    ```bash
    pnpm start:dev
    ```

2. **A aplicação será executada por padrão em `http://localhost:3000`.**

## Documentação da API com Swagger

1. **Acesse o Swagger UI:**

    Abra seu navegador e acesse `http://localhost:3000/api`.

2. **Configuração do Swagger:**

    A documentação do Swagger é gerada automaticamente e está disponível na rota `/api`.

## Configuração com Docker

1. **Construa e execute a aplicação com Docker Compose:**

    ```bash
    docker-compose up -d --build
    ```

2. **O Docker Compose configurará os seguintes serviços:**
   - **App:** Aplicação NestJS rodando na porta `3000`.
   - **DB:** Banco de dados PostgreSQL rodando na porta `5432`.

3. **Para parar os serviços:**

    ```bash
    docker-compose down
    ```

## Executando Testes Unitários

1. **Execute os testes usando Jest:**

    ```bash
    pnpm test
    ```

2. **Execute os testes com relatório de cobertura:**

    ```bash
    pnpm test:cov
    ```

---

## Informações Adicionais

### Dependências

- **NestJS:** Um framework Node.js progressivo para construir aplicações eficientes, confiáveis e escaláveis no lado do servidor.
- **TypeORM:** Um ORM que pode ser executado em várias plataformas e pode ser usado com TypeScript e JavaScript.
- **PostgreSQL:** Um sistema de gerenciamento de banco de dados relacional de código aberto.
- **Swagger:** Um conjunto de ferramentas para desenvolvedores de APIs, desde Swagger UI até a auto-geração de documentação de API.
- **Docker:** Um conjunto de produtos de plataforma como serviço que utilizam virtualização de nível de sistema operacional para entregar software em pacotes chamados containers.
- **Jest:** Um framework de testes JavaScript focado em simplicidade.

### Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `test/`: Contém os testes unitários da aplicação.
- `docker-compose.yml`: Arquivo de configuração do Docker Compose para configurar os containers da aplicação e do banco de dados.
- `.env`: Arquivo de variáveis de ambiente.
- `pnpm-lock.yaml`: Arquivo de lock para o gerenciador de pacotes pnpm.

### Variáveis de Ambiente

Certifique-se de que as seguintes variáveis de ambiente estejam definidas no seu arquivo `.env`:

```dotenv
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=mynestapp
POSTGRES_USER=nestuser
POSTGRES_PASSWORD=nestpwd

NESTJS_PORT=3000
NODE_ENV=dev
```

## Referências

- [Documentação Oficial do NestJS](https://docs.nestjs.com/)
- [Documentação do TypeORM](https://typeorm.io/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Swagger](https://swagger.io/docs/)
- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do Jest](https://jestjs.io/docs/getting-started)
