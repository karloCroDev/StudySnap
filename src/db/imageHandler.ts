// External packages
import { put, del } from '@vercel/blob';
import sharp from 'sharp';

export async function WriteImage(
  image: FormDataEntryValue | null,
  cropImage: boolean = true
): Promise<string | null> {
  try {
    if (!image || typeof image === 'string') return null;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let processedBuffer = buffer;

    if (cropImage) {
      processedBuffer = await sharp(buffer)
        .resize(312, 312)
        .jpeg({ quality: 70 })
        .toBuffer();
    }

    // Unique filename
    const filename = `${Date.now()}-${(image as File).name.replace(/\s+/g, '_')}`;

    // Upload to Vercel Blob Storage
    const blob = await put(filename, processedBuffer, {
      access: 'public',
    });

    return blob.url;
  } catch (error) {
    console.error('Error uploading image to Blob:', error);
    return null;
  }
}

export async function DeleteImage(imageUrl: string | null) {
  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split('/');
    const blobName = parts[parts.length - 1]; // Extract filename from URL

    await del(blobName);
  } catch (error) {
    console.error('Error deleting Blob image:', error);
  }
}
