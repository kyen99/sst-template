import { JobHandler } from 'sst/node/job'

// Test long running job

declare module 'sst/node/job' {
  export interface JobTypes {
    testJob: {
      num: number
    }
  }
}

export const handler = JobHandler('testJob', (payload) => {
  console.log(payload.num)
  return 'job ran successfully'
})
