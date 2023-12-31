import { Api } from 'sst/node/api'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function Home(props: any) {
  // You can call the API because this is a server component
  const res = await fetch(Api.testApi.url)
  const time2 = await res.text()
  console.log({ props, time2 })
  return (
    <div className='flex flex-1 justify-center items-center h-screen'>
      <Card className='flex flex-col gap-2'>
        <CardHeader>
          <CardTitle>{process.env.NEXT_PUBLIC_SITE_NAME}</CardTitle>
          <CardDescription>
            <p>{props.time}</p>
            <p>{time2}</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

// You can also call the API here because this runs during build time
export const generateStaticParams = async () => {
  const res = await fetch(Api.testApi.url)
  const time = await res.text()
  return [{ props: { time } }]
}
