import { Api } from 'sst/node/api'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// View this page at url /test

export default async function Home(props: any) {
  console.log(props)
  return (
    <div className='flex flex-1 justify-center items-center h-screen'>
      <Card className='flex flex-col gap-2'>
        <CardHeader>
          <CardTitle>{process.env.NEXT_PUBLIC_SITE_NAME}</CardTitle>
          <CardDescription>
            <p>{props.time}</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

// You can call the API here because this runs on the server during build time
export const generateStaticParams = async () => {
  const res = await fetch(Api.testApi.url)
  const time = await res.text()
  console.log(time)
  return [{ props: { test: 'test' } }]
}
