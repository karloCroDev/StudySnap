// External packages
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { context } = await req.json();

    // 100% making sure how AI is going to send me data
    const schema = {
      description: 'Quizz questions',
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: {
            type: SchemaType.STRING,
            description: 'Question',
            nullable: false,
          },
          content: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
            },
            minItems: 4,
            maxItems: 4,
          },
          correct: {
            type: SchemaType.NUMBER,
            description: 'Correct answer',
            nullable: false,
          },
        },
        required: ['question', 'content', 'correct'],
      },
    };

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAi.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });
    const quizzData = await model.generateContent(
      `Create me a quizz simmilar to the show who wants to be a millionaire. I will give you the context, and based on the length of the context generate me a quizz between 3 and 10 questions (question must be maxiumum one sentence, while answers need to be about one to two words, you choose the number of questions). Here is the context: ${context}.`
    );

    return NextResponse.json(quizzData.response.text(), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to generate quiz', { status: 500 });
  }
}
