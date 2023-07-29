import { NextjsSite, Api, Function, Cron, Job } from 'sst/constructs'
import { SSTConfig } from 'sst'

export const region = 'us-east-1'
export const name = 'shadcn-sst'

export default {
  config(_input) {
    return {
      name,
      region,
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Lambda function with api gateway (to make HTTPS calls to)
      const api = new Api(stack, 'testApi', {
        routes: {
          'GET /': 'functions/testApi.handler',
        },
      })

      // Lambda function only (to invoke directly using aws-sdk)
      const func = new Function(stack, 'func', {
        handler: 'functions/testFunction.handler',
      })

      // Code build job that runs in a docker container
      const job = new Job(stack, 'testJob', {
        handler: 'jobs/testJob.handler',
      })

      new Job(stack, 'pythonContainerJob', {
        runtime: 'container',
        handler: 'jobs/pythonContainerJob',
        container: {
          cmd: ['python3', '/var/task/run.py'],
        },
      })

      // Next JS site
      const site = new NextjsSite(stack, 'site', {
        bind: [api, func, job],
        environment: {
          NEXT_PUBLIC_SITE_NAME: 'SST Template',
        },
      })

      // Scheduled job
      // const cron = new Cron(stack, 'cron', {
      //   job: 'functions/testFunction.handler',
      //   schedule: 'rate(1 hour)',
      // })

      stack.addOutputs({
        ApiUrl: api.url,
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
