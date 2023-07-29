# SST production-ready template

This is built using [SST](https://docs.sst.dev/).

This includes everything needed to:

- Deploy a web frontend and backend with NextJS
- Deploy lambda functions with or without api gatway that can be called via HTTPS, cron, another lambda function or NextJS (ssr functions, react server components or api routes)
- Deploy long running dockerized jobs and invoke from NextJS, lambda or cron
- Anything else SST supports like Event Bus, Database, Message Queues, etc...

Everything is deployed to AWS. All infrastructure configuration is done in code in this repo.

Instructions assume you are using `yarn`

## Template Examples

- Next JS site (/app)
  - Test page calling function in server component (http://localhost:3000/)
  - Test page calling function in server build/render (http://localhost:3000/test)
- API route using a lambda function (/functions/testApi.ts)
- Lambda function which can be invoked directly (/functions/testFunction.ts)
- Long running job using built-in node container (/jobs/testJob.ts)
- Long running job in python using a Dockerfile (/jobs/pythonContainerJob)
- Cron job (commented out in sst.config.ts)

## Run Development

`yarn dev`

This will run `dev:sst` and `dev:next` using concurrently. You can also run these independently if you want them in separate terminal windows.

SST will provide a web [console url](https://console.sst.dev/) when started for getting URLs to endpoints, invoking lambda functions, testing apis, running sql queries on rds, etc...

Front end will be running [locally](http://localhost:3000)

SST will provide dev URLs in the terminal and in the [console](https://console.sst.dev)

## Deploy to Production

`yarn deploy`

## Initial Setup

### Install Required Software

- [Homebrew](https://brew.sh), if you need to install any of the packages below. Requires XCode & XCode command line tools.
- node (`brew install node@18`)
- nvm (optional, manages node versions: `brew install nvm`)
- yarn (optional, `npm i -g yarn`)
- awscli (`brew install awscli`)
- docker (required if you need to use long running dockerized jobs, `brew install docker`)
- this repo (`git clone [url of this repo]`)

### Install node packages

- If using `nvm` run `nvm use` in the root to use lts/hydrogen (v18). You may need to install first using `nvm install lts/hydrogen`
- Run `yarn` in the root of the repo to install package dependencies

### Set up AWS

Your AWS credentials should be in the local environment. If not, use `aws configure`

### Setup SST

Run `yarn dev:sst`.

The first time you run it, SST will deploy a dev environment and will prompt for a name for your personal dev environment. You should use your name instead of something like "dev" to avoid conflicting with anyone else doing development on the same repo.

## New Project

For a new project check the project name and aws region at the top of `sst.config.ts`

## Adding new services

Example service configurations are in sst.config.ts. Creating a new service generally involves simply adding resource files and adding a configuration to sst.config.ts.

For example, to create a new Lambda function with an api gateway wrapper:

- Create a file with a lambda handler in /functions
- Add a service configuration in sst.config.ts using the Api construct
- Add a `bind` entry where needed to give other services access to the new service

## Next JS Template

The Next JS template is pre-configured with:

- App folder (supports react server components)
- Typescript
- [Tailwindcss](https://tailwindcss.com/docs/installation)
- [Shadcn UI](https://ui.shadcn.com/) - Radix Components styled with Tailwindcss
