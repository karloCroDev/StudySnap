// External packages
import { unlink } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Function to write an image to the file system
export async function WriteImage(
  image: FormDataEntryValue | null,
  cropImage: boolean = true
): Promise<string | null> {
  try {
    let imageUrl: string|null = null;

    if (image && typeof image !== 'string') {
      // Creates a buffer from the image and resizes it to 312x312 pixels
      let buffer
      if (cropImage){
        buffer = await sharp(Buffer.from(await image.arrayBuffer()))
          .resize(312, 312)
          .jpeg({quality: 70})
          .toBuffer();
      }
      else{
        buffer = Buffer.from(await image.arrayBuffer())
      }
      // Generates a unique filename using the current timestamp and the original image name
      const filename = Date.now() + image.name.replaceAll(' ', '_');
      // Constructs the file path where the image will be saved
      const filePath = path.join(process.cwd(), 'public/uploads', filename);

      // Writes the resized image buffer to the specified file path
      await writeFile(filePath, buffer);

      // Stores the relative path to the image
      imageUrl = `public/uploads/${filename}`;
      return imageUrl;
    }
    return null;
  } catch (error) {
    console.error('Failed to write image into uploads folder', error);
    return null;
  }
}

// Function to read an image from the file system and return it as a base64 encoded string
export async function GetImage(
  imageUrl: string | null
): Promise<Buffer | null> {
  if (imageUrl) {
    try {
      // Reads the image file from the specified path
      const imageBuffer = await readFile(imageUrl);
      // Converts the image buffer to a base64 encoded string
      return imageBuffer;
    } catch (error) {
      console.error('Error reading image:', error);
      return null;
    }
  }
  return null;
}

// Function to read a profile image, resize it, and return it as a base64 encoded string
export async function GetProfileImage(
  imageUrl: string | null
): Promise<string | null> {
  if (imageUrl) {
    try {
      // Reads the image file from the specified path, resizes it to 128x128 pixels, and converts it to a buffer
      const imageBuffer = await sharp(await readFile(imageUrl))
        .resize(128, 128)
        .toBuffer();
      // Converts the resized image buffer to a base64 encoded string
      const base64Image = imageBuffer.toString('base64');
      return base64Image;
    } catch (error) {
      console.error('Error reading image:', error);
      return null;
    }
  }
  return null;
}

export async function DeleteImage(
  imageUrl: string | null
){
  console.log(imageUrl)
  if (!imageUrl){return}
  try {
    unlink(imageUrl, (error)=>{
          console.error('Error deleting file:', error);
    })
  }catch (error) {
    console.error('Error deleting file:', error);
    return;
  }
}