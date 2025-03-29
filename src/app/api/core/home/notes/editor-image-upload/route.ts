// Etxernal packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { WriteImage } from '@/db/imageHandler';

//Function that writes the image
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get('file');

  if (!image) {
    return NextResponse.json(
      {
        message: `Failed to get note`,
      },
      {
        status: 500,
      }
    );
  }
  const imagePath = await WriteImage(image, false);
  const correctedImagePath = '/' + imagePath?.split('/').slice(1).join('/');

  return NextResponse.json(correctedImagePath, {
    status: 201,
  });
}
