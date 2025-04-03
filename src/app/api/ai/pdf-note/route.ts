// External packages
import { NextResponse } from 'next/server';

// Lib
import { modelPro } from '@/lib/ai';

// API that analyses the image and can understand text.Also user gives him his own parameters on how he wants things to be done (Analyse image)
export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const pdf = data.get('file') as File;
    const prompt = data.get('prompt') as string;

    if (!pdf) {
      return NextResponse.json('Please enter a valid pdf', { status: 400 });
    }
    const bytes = await pdf.arrayBuffer();

    const result = await modelPro.generateContent([
      {
        inlineData: {
          data: Buffer.from(bytes).toString('base64'),
          mimeType: 'application/pdf',
        },
      },
      `
      Your given users prompt: ${prompt} 
      If the prompt is not understandable then analyze the pdf and generate concise summary notes based on the text it contains. Please ensure that response that use MARKDOWN FORMAT of the text without any prefaces but only the content itself.`,
    ]);

    return NextResponse.json(result.response.text(), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('An error occurred while processing the image', {
      status: 500,
    });
  }
}
