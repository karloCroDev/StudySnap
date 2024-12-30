// External packages
import { NextResponse } from 'next/server';

// Config
import { modelFlash } from '@/app/config/ai';

export async function POST(req: Request) {
  const { prompt, context } = await req.json();

  const completedSentence = await modelFlash.generateContent(
    `Your given a context of the document with text, and users reponse about how he wants his text to be generated. Return him the whole text with context based on his response. Generate me text in a MARKDOWN format 
    Here is the users response: ${prompt}
    Here is the context of the document: ${context}`
  );

  return NextResponse.json({ text: completedSentence.response.text() });
}
