// External packages
import { NextResponse } from 'next/server';

// Lib
import { modelFlash } from '@/lib/ai';

// API that generates content based on users preferences (generate content)
export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    const completedSentence = await modelFlash.generateContent(
      `You are provided with a document context and a user's response. Your task is to generate a response in MARKDOWN format, without using code block quotations. The response should include only the necessary content without any introductory text. 
    
    While the response can be informed by the document context, it is not strictly limited to it. You are free to generate content beyond the document's scope if needed to fully address the user's request.
    
    Here is the user's response: ${prompt}
    Here is the context of the document (ignore any HTML tags): ${context}`
    );
    return NextResponse.json(completedSentence.response.text(), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json('An error occured trying to modify text', {
      status: 500,
    });
  }
}
