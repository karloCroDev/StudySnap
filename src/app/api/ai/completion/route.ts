// External packages
import { NextResponse } from 'next/server';

// Lib
import { modelFlash } from '@/lib/ai';

// API that completes the sentence when user is out of ideas (complete sentence)
export async function POST(req: Request) {
  try {
    const { context } = await req.json();

    const completedSentence = await modelFlash.generateContent(
      `You are given a context of the document with text, and your task is to complete last sentence, and write one more. Also big note don't repeat alreday exisiting part of sentence, just write it like you would continue (don't write whole sentence)!
      Here is the given part: ${context}`
    );

    return NextResponse.json(completedSentence.response.text(), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      'An error occured trying to complete the sentecne',
      { status: 500 }
    );
  }
}
