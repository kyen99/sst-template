import { ApiHandler } from 'sst/node/api'

// Test for a lambda function with an api gateway wrapper

export const handler = ApiHandler(async (evt) => {
  return {
    statusCode: 200,
    body: evt.requestContext.time,
  }
})
