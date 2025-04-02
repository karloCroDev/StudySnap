import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const modelFlash = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
const modelPro = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

export { modelFlash, modelPro };

