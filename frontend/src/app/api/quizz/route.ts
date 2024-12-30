// External packages
import { NextResponse } from 'next/server';

// Config
import { modelFlash } from '@/app/config/ai';

export async function POST(req: Request) {
  const body = await req.json();
  const { context } = body;
  const quizzData = await modelFlash.generateContent(
    `Create me a quizz simmilar to the show who wants to be a millionaire. I will give you the context, and based on that context generate me a quizz with miniumum of 3 questions and maximum of 5 questions (question must be maxiumum one sentence, while answers need to be about one to two words). Please recoginze the language and then give in the same language, also follow the schema you have been given. Here is the context: ${context}.`
  );

  return NextResponse.json(quizzData.response.text());
}
