// Test for a lambda function that is invoked directly by a nextjs route or cron

export const handler = (event: any) => {
  console.log({ event })
  return {
    status: 'done',
  }
}
