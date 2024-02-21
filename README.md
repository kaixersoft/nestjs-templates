<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS basic template</h1>

## Description

Serve as a starting point to start new basic NestJS project that has all the packages needed to provide CRUD on Postgres database

## Built-in Modules

- database module
  - this module provides typeorm configuration
- note module
  - this is a sample module for your reference, you may delete this module after creating your own module

## Pre-requisite

- Git ( https://git-scm.com/downloads )
- NVM (node version manager) https://github.com/nvm-sh/nvm
- VScode ( https://code.visualstudio.com/download )
  - Install extension VSCode ESLint
  - Install extension Prettier Code Formatter
  - Install extension Prettier ESLint
- Docker ( https://www.docker.com/products/docker-desktop/ )

## Installation

Clone and install npm package dependencies

```bash
$ git clone https://github.com/kaixersoft/nestjs-templates.git app
$ cd app
$ npm install
```

Provision local Postgres thru docker

```bash
$ docker compose up -d
```

Copy .env.local to .env

```bash
$ cp .env.local .env
```

Run migration

```bash
$ npm run typeorm:migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

How to generate migration based on your entity

```bash
$ npm run typeorm:migration:generate <migration_name>
```

How to run all new migrations

```bash
$ npm run typeorm:migration:run
```

How to revert previous migration

```bash
$ npm run typeorm:migration:revert
```

## References

- Official NestJs Documentation can be found on https://docs.nestjs.com/
- Download sample Notes postman collection [here](/Notes.postman_collection.json)
