<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS boilerplate</h1>

## Description

Boilerplate for creating nestjs application that integrates
third party API, it uses Job Queue to process actual external API call.

## Built-in Modules

- BullBoard module
  - this module provides GUI that provides information regarding how your Queue jobs was process.
- Sample module
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
$ git checkout single-repo
$ npm install
```

Provision local Server Instances of Redis and BullBoard thru docker

```bash
$ docker compose up -d
```

Copy .env.local to .env

```bash
$ cp .env.local .env
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
