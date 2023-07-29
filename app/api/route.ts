import { Function } from 'sst/node/function'
import { NextRequest } from 'next/server'
import { region } from '@/sst.config'
import {
  LambdaClient,
  InvokeCommand,
  InvocationRequest,
} from '@aws-sdk/client-lambda'

const client = new LambdaClient({
  region,
})

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const Payload = encoder.encode(JSON.stringify({ hello: 'world' }))

const input: InvocationRequest = {
  FunctionName: Function.func.functionName,
  InvocationType: 'RequestResponse',
  Payload,
}

export const GET = async (req: NextRequest) => {
  const body = await req.text()
  console.log(body)
  const result = await client.send(new InvokeCommand(input))
  const payload = decoder.decode(result.Payload)
  return new Response(JSON.stringify(payload))
}
