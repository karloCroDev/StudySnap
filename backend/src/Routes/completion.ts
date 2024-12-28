// External packages
import express from 'express';

// Config
import { modelFlash } from '../Config/config';

const router = express.Router();

router.post('/completion', async (req, res) => {
  const { context } = req.body;

  const completedSentence = await modelFlash.generateContent(
    `You are given a context of the document with text, and your task is to complete last sentence, and write one more. Also big note don't repeat alreday exisiting part of sentence, just write it like you would continue (don't write whole sentence)!
    Here is the given part: ${context}`
  );
  res.json(completedSentence.response.text());
});

export { router as completion };
