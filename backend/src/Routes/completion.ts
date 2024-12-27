// External packages
import express from 'express';

// Config
import { modelFlash } from '../Config/config';

const router = express.Router();

router.post('/completion', async (req, res) => {
  const { sentence } = req.body;
  console.log(sentence);
  const completedSentence = await modelFlash.generateContent(
    `You are given a context of the document with text, and your task is to complete last sentence, or write one sentence if there isn't any sentence started (NOT more than one sentence!). Also big note don't repeat sentence, just write it like you would continue (don't write whole sentence)! Here is the given part: ${sentence}`
  );
  res.json(completedSentence.response.text());
});

export { router as completion };
