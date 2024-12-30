// External packages
import { NextResponse } from 'next/server';

// Config
import { modelPro } from '@/app/config/ai';

export async function POST(req: Request) {
  const data = await req.formData();
  const image = data.get('file') as unknown as File;

  if (!image) return NextResponse.json('Please enter the valid image');

  const bytes = await image.arrayBuffer();

  const result = await modelPro.generateContent([
    {
      inlineData: {
        data: Buffer.from(bytes).toString('base64'),
        mimeType: 'image/jpeg',
      },
    },
    'Please analyze the image and generate concise summary notes based on the text it contains. If the image does not include any text, provide a brief and accurate description of its content instead. Please ensure that the notes are relevant and informative and that they use MARKDOWN FORMAT and NATIVE LANGUAGE of the text.',
  ]);
  return NextResponse.json(result.response.text());
}
