import Chat from "@/components/Chat/page"
import { getAgentDetails } from "@/lib/getAgentDetails"
import { redirect } from 'next/navigation'

export default async function ID({ params }: {params: Promise<{ id: string }>}) {
    const { id } = await params
    const agent = await getAgentDetails(id)

    if (!agent) {
        redirect("/")
    }

  return (
    <Chat agent={agent}/>
  )
}
