// External packages
import { NextResponse } from 'next/server';

// Config
import { modelFlash } from '@/lib/ai';

// API that generates content based on users preferences (generate content)
export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    const completedSentence = await modelFlash.generateContent(
      `Your given a context of the document with text, and users reponse what he wants to do with his text or maybe to generate something new. Make sure that it is in MARKDOWN format and that the response contains only needed content without any prefaces!
      Here is the users response: ${prompt}
      Here is the context of the document (ignore that there are HTML tags): ${context}`
    );

    return NextResponse.json(completedSentence.response.text(), {
      status: 200,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json('An error occured trying to modify text', {
      status: 500,
    });
  }
}
