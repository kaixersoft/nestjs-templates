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
- RBAC module
  - this module handles all your routes authentication, it makes all your routes protected
- Sample module
  - this is a sample module for your reference, you may delete this module after creating your own module

### Project Structure

- `.docker` - used when mounting volumes for your local docker containers
- `.vscode` - contains VSCode setting such as auto fix lint issues and auto format
- `src` - this is the main source code folder of your nestjs project
  - `common` - this folder contains all reusable module, class for any feature module
  - `bullboard` - this is a feature module that handles your Queue user interface
  - `sample` - this is a sample feature module that showcase how to structure your feature and also how to integrate Service Layer API
  - `app.controller.ts` - this is the main nestjs app routes, only `/health` is supposed to be here for ECS container health checking, must be public route.
  - `app.module.ts` - this is the main nestjs module, this is where you register your new feature module, which is automatically updated upon generating new module.
  - `main.ts` - this is the main nestjs app entry file, it has all the configuration built-in already for all your use cases.
- `test` - this folder is for all your unit tests
- `.env` - this file needs to be manually created base on `.env.local`, contents needs to be updated, such as credentials
- `.env.local` - this is the sample env file for your reference only
- `.npmrc` - this is generated using the script `generate-npmrc.sh`, this file is needed for you to be able to install RBAC decorators from RND team.
- `docker-compose.yaml` - this is a file for you to provision local instance of REDIS via docker
- `Dockerfile` - this is a file use to generate your project docker image ready for container deployment
- `package.json` - this file list your NPM package dependencies

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

## How generate a feature module classes

- Generate a feature module
  `$> nest g module <feature_name>`
- Generate a controller for your feature module
  `$> nest g controller <feature_name>`
- Generate a service for your feature module
  `$> nest g service <feature_name>`

## How to pull RND's RBAC npm package

Package : `@rnd-ai-npm-domain/identity-middleware`

- Step 1: Download and configure AWS CLI on your local

  - Download [here for windows](https://awscli.amazonaws.com/AWSCLIV2.msi)
  - Configure your AWS default AWS profile

    - ```
      $> aws configure
      $> AWS Access Key ID: < BACKEND_DEV_IAM_KEY_ID >
      $> AWS Secret Access Key: < BACKEND_DEV_IAM_SECRET >
      $> Default region name : ap-southeast-1
      ```

- Step 2: Go to you template repo directory and run the following to generate a file called `.npmrc`

  - `AWS_ACCESS_TOKEN=$(aws codeartifact get-authorization-token --domain rnd-ai-npm-domain --domain-owner 560348292202 --query authorizationToken --output text) && echo -e "@rnd-ai-npm-domain:registry=https://rnd-ai-npm-domain-560348292202.d.codeartifact.ap-southeast-1.amazonaws.com/npm/ai-npm-repository/\n//rnd-ai-npm-domain-560348292202.d.codeartifact.ap-southeast-1.amazonaws.com/npm/ai-npm-repository/:_authToken=${AWS_ACCESS_TOKEN}" > .npmrc`

- Step 3 : Install the package
  ` npm install`
