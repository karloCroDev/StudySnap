// External packages
import express from 'express';

// Config
import { modelFlash } from '../Config/config';

const router = express.Router();

router.post('/completion-context', async (req, res) => {
  const { prompt, context } = req.body;
  const completedSentence = await modelFlash.generateContent(
    `Your given a context of the document with text, and users reponse about how he wants his text to be generated. Return him the whole text with context based on his response. Generate me text in a MARKDOWN format 
    Here is the users response: ${prompt}
    Here is the context of the document: ${context}`
  );
  res.json(completedSentence.response.text());
});

export { router as completionWithContext };
