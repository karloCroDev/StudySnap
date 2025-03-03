// External packages
import { NextResponse } from 'next/server';

// Config
import { modelFlash } from '@/lib/ai';

// API that returns data based on users prompts (ask ai)
export async function POST(req: Request) {
  try {
    const {
      prompt,
      editorContent,
      chatHistory,
    }: {
      prompt: string;
      editorContent: string;
      chatHistory: {
        authorOfMessage: 'ai' | 'user';
        content: string;
      }[];
    } = await req.json();

    const chatHistoryExists = chatHistory.length
      ? `Here is the whole conversation that was between user and you: ${chatHistory.map((message) => `Author: ${message.authorOfMessage}  Message: ${message.content}`)}`
      : '';

    const completedSentence = await modelFlash.generateContent(
      chatHistoryExists +
        ` Here is the document current content: ${editorContent}
        Here is the user prompt: ${prompt}`
    );

    return NextResponse.json(
      {
        authorOfMessage: 'ai',
        content: completedSentence.response.text(),
        statusText: 'Successfully completed the users prompt',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { statusText: 'Failed to get the response from ai' },
      { status: 500 }
    );
  }
}
