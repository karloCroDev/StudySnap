// External packages
import { NextResponse } from 'next/server';

// Config
import { modelFlash } from '@/app/config/ai';

export async function POST(req: Request) {
  const { context } = await req.json();

  const completedSentence = await modelFlash.generateContent(
    `You are given a context of the document with text, and your task is to complete last sentence, and write one more. Also big note don't repeat alreday exisiting part of sentence, just write it like you would continue (don't write whole sentence)!
    Here is the given part: ${context}`
  );
  return NextResponse.json({ text: completedSentence.response.text() });
}
