import { cookies } from "next/headers"
import { createClient } from "./supabase/server"

export type Agent = {
    id: string;
    name: string;
    description: string;
    greeting: string;
    starter_prompts: [];
    profile_image: string;
    created_at: string;
    knowledge_base: string;
    prompt: string;
};

export async function getAgentDetails(id: string){
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)

    // add error catch
    const { data } = await supabase
        .from('agents')
        .select()
        .eq('id', id)
        .single()

    return data as Agent
}

export async function getAgentKnowledge(){
    const cookieStore = cookies()
const supabase = await createClient(cookieStore)

    const { data } = supabase.storage.from('knowledge').getPublicUrl('user/TEWC5111 Summative Assessment.pdf')

    return data
}