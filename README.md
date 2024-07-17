# NestJS Project with TypeORM and MySQL

This project is a sample NestJS application that uses TypeORM for database interactions with MySQL. It includes Swagger for API documentation and Docker Compose for containerizing the application and database. Additionally, it features unit tests written with Jest.

## Table of Contents

1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Swagger API Documentation](#swagger-api-documentation)
4. [Docker Setup](#docker-setup)
5. [Running Unit Tests](#running-unit-tests)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd client-satisfaction
    ```

2. **Install dependencies using pnpm:**

    ```bash
    pnpm install
    ```

3. **Create a `.env` file based on the `.env.example` file and update the necessary environment variables:**

    ```bash
    cp .env.example .env
    ```

## Running the Application

1. **Start the application:**

    ```bash
    pnpm start
    ```

2. **The application will run on `http://localhost:3000` by default.**

## Swagger API Documentation

1. **Access Swagger UI:**

    Open your browser and navigate to `http://localhost:3000/api`.

2. **Swagger configuration:**

    The Swagger documentation is automatically generated and available at `/api` route.

## Docker Setup

1. **Build and run the application with Docker Compose:**

    ```bash
    docker-compose up --build
    ```

2. **Docker Compose will set up the following services:**
   - **App:** NestJS application running on port `3000`.
   - **DB:** MySQL database running on port `3306`.

3. **To stop the services:**

    ```bash
    docker-compose down
    ```

## Running Unit Tests

1. **Run tests using Jest:**

    ```bash
    pnpm test
    ```

2. **Run tests with coverage report:**

    ```bash
    pnpm test:cov
    ```

---

## Additional Information

### Dependencies

- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM:** An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript.
- **MySQL:** An open-source relational database management system.
- **Swagger:** A suite of tools for API developers from Swagger UI to Auto-generate API documentation.
- **Docker:** A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.
- **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity.

### Project Structure

- `src/`: Contains the source code of the application.
- `test/`: Contains the unit tests for the application.
- `docker-compose.yml`: Docker Compose configuration file for setting up the application and database containers.
- `.env`: Environment variables file.
- `pnpm-lock.yaml`: Lockfile for pnpm package manager.

### Environment Variables

Ensure the following environment variables are set in your `.env` file:

```dotenv
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=test
