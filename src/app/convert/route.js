import { NextResponse } from "next/server"
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
})

export async function POST(req) {
  const data = await req.json()
  console.log(data)

  if (!data || !data.language || !data.input) {
    return NextResponse.error('Invalid request')
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `
You are a bot that receives pseudocode and returns the code in any language the user specifies.
You ONLY respond with code and NOTHING ELSE.

I would like you to convert the following pseudocode into ${data.language}:

${data.input}
        `
      }
    ],
  })

  console.log(completion)

  return NextResponse.json({
    output: completion.choices[0].message.content,
  })
}
