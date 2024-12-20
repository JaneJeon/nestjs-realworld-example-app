# ![NestJS](project-logo.png)

> ### NestJS + MikroORM codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) API spec.

> Rewrite of https://github.com/lujakob/nestjs-realworld-example-app to MikroORM.

---

# Getting started

## Installation

Install dependencies

    npm i

Copy config file and set JsonWebToken secret key

    cp src/config.ts.example src/config.ts

---

## Database

The example codebase uses [MikroORM](https://mikro-orm.io/) with a MySQL database.

You can use `docker compose up -d` to start up MySQL with the default settings.

Copy MikroORM config example file for database settings and adjust the connection settings.

    cp src/mikro-orm.config.ts.example src/mikro-orm.config.ts

Now you can start the application with `npm start`. It will automatically
create the database and run initial migration that sets up the database
schema.

---

## NPM scripts

- `npm start` - Start application
- `npm run start:dev` - Start application in watch mode
- `npm test` - run Jest test runner
- `npm run start:prod` - Build application

---

## API Specification

This application adheres to the api specifications set by the [Thinkster](https://github.com/gothinkster) team. This helps mix and match any backend with any other frontend without conflicts.

> [Full API Spec](https://github.com/gothinkster/realworld/tree/master/api)

More information regarding the project can be found here https://github.com/gothinkster/realworld

---

## Start application

- `npm start`
- Test api by browsing to `http://localhost:3000/api/articles`
- View automatically generated swagger api docs by browsing to `http://localhost:3000/docs`
- Run e2e tests from the `gothinkster/realworld` repository with `npm run test:e2e`

---

# Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token.
