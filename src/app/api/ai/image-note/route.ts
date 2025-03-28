// External packages
import { NextResponse } from 'next/server';

// Config
import { modelPro } from '@/lib/ai';

// API that analyses the image and can understand text.Also user gives him his own parameters on how he wants things to be done (Analyse image)
export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const image = data.get('file') as unknown as File;
    const prompt = data.get('prompt') as string;

    if (!image) {
      return NextResponse.json('Please enter a valid image', { status: 400 });
    }

    const bytes = await image.arrayBuffer();

    const result = await modelPro.generateContent([
      {
        inlineData: {
          data: Buffer.from(bytes).toString('base64'),
          mimeType: 'image/jpeg',
        },
      },
      `
      Your given users prompt: ${prompt} 
      If the prompt is not understandable then analyze the image and generate concise summary notes based on the text it contains. If the image does not include any text, provide a brief and accurate description of its content instead. Please ensure that response that use MARKDOWN FORMAT and NATIVE LANGUAGE of the text without any prefaces but only the content itself.`,
    ]);

    return NextResponse.json(result.response.text(), { status: 200 });
  } catch (error) {
    return NextResponse.json('An error occurred while processing the image', {
      status: 500,
    });
  }
}
