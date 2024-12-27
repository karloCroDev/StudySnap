// External packages
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// Mozes odvojiti ovo posebno kada se budes spajao na db
const port = process.env.PORT;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const modelFlash = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const modelPro = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

export { port, modelFlash, modelPro };
