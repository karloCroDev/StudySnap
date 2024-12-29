// External packages
import express from 'express';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const router = express.Router();

const schema = {
  description: 'Quizz questions',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      question: {
        type: SchemaType.STRING,
        description: 'Question',
        nullable: false,
      },
      content: {
        type: SchemaType.ARRAY,

        items: {
          type: SchemaType.STRING,
        },

        minItems: 4,
        maxItems: 4,
      },
      correct: {
        type: SchemaType.NUMBER,
        description: 'Correct answer',
        nullable: false,
      },
    },
    required: ['question'],
  },
};

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAi.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: schema,
  },
});

router.post('/quizz', async (req, res) => {
  const { context } = req.body;
  const quizzData = await model.generateContent(
    `Create me a quizz simmilar to the show who wants to be a millionaire. I will give you the context, and based on that context generate me a quizz with miniumum of 3 questions and maximum of 5 questions (question must be maxiumum one sentence, while answers need to be about one to two words). Please recoginze the language and then give in the same language, also follow the schema you have been given. Here is the context: ${context}.`
  );

  res.json(quizzData.response.text());
});

export { router as quizz };
