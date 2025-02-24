// External packages
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
const sharp = require('sharp')

export async function WriteImage(image: FormDataEntryValue | null ): Promise<string | null> {   
    try{
        let imageUrl = null

        if (image && typeof image !== 'string') {
            //Creates buffer from the image and resizes it
            const buffer = await sharp(Buffer.from(await image.arrayBuffer())).resize(312, 312);

            const filename = Date.now() + image.name.replaceAll(" ", "_");
            const filePath = path.join(process.cwd(), "src/public/uploads", filename);

            await writeFile(filePath, buffer);
            
            imageUrl = `src/public/uploads/${filename}`; // Store the relative path to the image
            return imageUrl
        }
        return null
    }
    catch (error) {
        console.error("Failed to write image into uploads folder", error)
        return null
    }   
}

export async function GetImage(imageUrl: string | null): Promise<string | null>{
    if (imageUrl) {
        try {
            const imageBuffer = await readFile(imageUrl);
            const base64Image = imageBuffer.toString('base64');
            return base64Image;
        } catch (error) {
            console.error('Error reading image:', error);
            return null
        }
    } 
    return null
}