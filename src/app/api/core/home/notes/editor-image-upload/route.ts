// Etxernal packages
import { NextResponse, NextRequest } from 'next/server';

// Models
import { GetImage, WriteImage } from '@/database/ImageHandler';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get('file');

  if (!image) {
    return NextResponse.json({
      status: 500,
      statusText: `Failed to get note`,
    });
  }
  const imagePath = await WriteImage(image);
  const correctedImagePath = '/' + imagePath?.split('/').slice(1).join('/');
  // const encodedImage = await GetImage(imagePath);

  return NextResponse.json(correctedImagePath, {
    status: 201,
    statusText: 'Successfully uploaded image',
  });
}
