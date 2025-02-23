// External packages
import { writeFile, readFile } from 'fs/promises';
import path from 'path';


//use this to crop image and save storage: https://cloudinary.com/documentation/resizing_and_cropping || react-easy-crop
export async function WriteImage(image: FormDataEntryValue | null ): Promise<string | null> {
    if (image == null) return null
    let imageUrl = null
    try{
        if (image && typeof image !== 'string') {
            const buffer = Buffer.from(await image.arrayBuffer());
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