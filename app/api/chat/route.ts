import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod'
import { Innertube } from 'youtubei.js';
import { getAgentDetails } from '@/lib/getAgentDetails';

export const maxDuration = 30;
 
export async function POST(req: Request) {
  const { messages, id } = await req.json();
  
  const agent = await getAgentDetails(id)

  const system = JSON.stringify(agent)
 
  const result = streamText({ 
    model: google('models/gemini-2.0-flash'), 
    maxSteps: 50,
    system: system,
    messages, 
    tools: {
        getVideoDetails: tool({
            description: 'Get youtube video information based on the video url.',
            parameters: z.object({
                url: z.string()
            }),
            execute: async({ url }) => {
                try {
                    const innertube = await Innertube.create();
                    let videoId = '';
                    const parsed = new URL(url);

                    if (parsed.hostname === 'youtu.be') {
                    videoId = parsed.pathname.slice(1); // removes the leading "/"
                    } else {
                    videoId = parsed.searchParams.get('v') || '';
                    }

                    if (!videoId) throw new Error('Invalid video URL');
                
                    if (!videoId) throw new Error('Invalid video URL');
                
                    const videoInfo = await innertube.getInfo(videoId);
                    const { short_description: description, title, like_count: likes } = videoInfo.basic_info;
                
                    return { description, title, likes }; // ✅ Must return a plain object
                  } catch (err) {
                    console.error('Tool error:', err);
                    return { description: '', title: '', likes: 0 }; // or return an error string if your model handles it
                  }
            }
        })
    }
  });

  return result.toDataStreamResponse();
}