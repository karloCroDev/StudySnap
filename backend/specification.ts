import dotenv from 'dotenv';

dotenv.config();

export const port = 4000;
export const geminiApiKey = process.env.GEMINI_API_KEY;
