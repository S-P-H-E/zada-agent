"use client"
import { useChat } from '@ai-sdk/react'
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { FaArrowUp } from "react-icons/fa6";
import { copyAsRichText } from '@/components/copyRichText';
import { LuCopy } from "react-icons/lu";
import clsx from 'clsx';
import { useRef } from 'react';
import { Agent } from '@/lib/getAgentDetails';

interface ChatProps {
    agent: Agent
}

export default function Chat({ agent }: ChatProps) {
  const formRef = useRef<HTMLFormElement>(null)
    
  const id = agent.id
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    body: { id }
  })
  
  const onPromptClick = (prompt: string) => {
    // Update input
    handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLInputElement>)
    // Submit form programmatically
    if (formRef.current) {
      formRef.current.requestSubmit()  // works like clicking submit button
    }
  }

  return (
    <div className="whitespace-pre-wrap w-[800px] mx-auto relative">
      <div className='flex justify-between py-10 motion-opacity-in-0 motion-preset-expand motion-blur-in-xl motion-duration-1200'>
        <Image src={agent.profile_image} alt="logo" width={50} height={0} className='rounded-full w-[50px] h-[50px] object-cover'/>
        <h1 className='text-[#727274] text-xl font-medium'>{agent.name}</h1>
      </div>

      {messages.length === 0 && (
        <div className='p-1 flex flex-col items-center justify-center fixed top-0 bottom-0 w-[800px] gap-3 motion-delay-500 motion-blur-in-xl motion-duration-1200'>
          <h1 className='text-4xl font-semibold motion-delay-500 motion-opacity-in-0 -motion-translate-y-in-150'>{agent.greeting}</h1>
          <p className='w-[500px] text-center text-[#727274] motion-delay-700 motion-opacity-in-0 -motion-translate-y-in-150'>{agent.description}</p>
          <div className='flex flex-wrap w-[500px] justify-center gap-2 mt-3 motion-delay-900 motion-opacity-in-0 -motion-translate-y-in-150'>
            {agent.starter_prompts.map((prompt, i) => (
              <button key={i} onClick={() => onPromptClick(prompt)} className='border border-[#3f3f3f] cursor-pointer duration-300 hover:bg-[#3f3f3f] px-2 py-1 rounded-full text-sm'>
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className='mb-36'>
        {messages.map(m => (
          <div key={m.id} className='flex flex-col group my-6'>
            {m.role === 'user' ? (
              <>
                <div className='bg-[var(--secondary)] border border-[var(--border)] w-fit max-w-[400px] px-4 py-2 rounded-xl'>
                  {/* <Image src="/ai.png" alt="logo" width={30} height={0} className='brightness-0 invert h-fit'/> */}
                  <div className='line-clamp-6'>
                    {m.content}
                  </div>
                </div>
              </>
              
            ) : (
              <div className='flex gap-x-2'>
                {/* <Image src="/ai.png" alt="logo" width={30} height={0} className='h-fit'/> */}
                <ReactMarkdown components={{ a: ({ ...props }) => ( <a {...props} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer" /> ), }}>
                  {m.content}
                </ReactMarkdown>
              </div>
            )}
            <div className={clsx(m.role === 'user' && 'opacity-0 group-hover:opacity-100 transition-opacity duration-200', 'mt-3')}>
              <button onClick={() => copyAsRichText(m.content)} className='cursor-pointer w-fit'>
                <LuCopy />
              </button>
            </div>
          </div>
        ))}
      </div>
 
      <form ref={formRef} onSubmit={handleSubmit} className='fixed container bottom-0 mb-10 bg-[var(--secondary)] border border-[var(--border)] shadow-lg rounded-2xl w-[800px] motion-delay-1000 motion-opacity-in-0 -motion-translate-y-in-150 motion-blur-in-xl'>
        <div className='flex items-start'>
          <input
            // rows={1}
            // onInput={(e) => {
            //   const target = e.target as HTMLTextAreaElement;
            //   target.style.height = 'auto'; // reset height
            //   target.style.height = target.scrollHeight + 'px'; // grow to fit content
            // }}
            value={input} 
            placeholder="Say something..."
            onChange={handleInputChange} 
            className='p-4 w-full rounded-2xl focus:outline-none resize-none overflow-hidden'
          />
          <button type='submit' className='bg-white text-black cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full mt-2 mr-2'>
            <FaArrowUp />
          </button>
        </div>
      </form>
    </div>
  )
}
