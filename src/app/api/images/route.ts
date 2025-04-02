import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';
import { GetImage } from '@/db/imageHandler';

export async function GET(req: NextRequest) {
  try {
    //Get imageUrl
    const searchParams = req.nextUrl.searchParams;
    const imageUrl = searchParams.get('imageUrl');

    if (!imageUrl || imageUrl == "undefined") {
      return new Response(JSON.stringify({ error: 'Missing image url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const imageBuffer = await GetImage(imageUrl)

    // Determine the content type based on the file extension
    const ext = path.extname(imageUrl).toLowerCase();
    const contentType =
      ext === '.jpg' || ext === '.jpeg'
        ? 'image/jpeg'
        : ext === '.png'
        ? 'image/png'
        : ext === '.gif'
        ? 'image/gif'
        : 'application/octet-stream'; // Default to binary stream if unknown

        // Serve the image
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length' :`${imageBuffer?.length.toString() ?? 0}`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to load image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}