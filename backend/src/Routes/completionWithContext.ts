// External packages
import express from 'express';

// Config
import { modelFlash } from '../Config/config';

const router = express.Router();

router.post('/completion-users-request', async (req, res) => {
  const { context, usersResponse } = req.body;
  const completedSentence = await modelFlash.generateContent(
    `Your given a context of the document with text, and users reponse about how he wants his text to be generated. If there is no context of document, but instead only the question of user how he wants his text to be generated, then you should generate text based on that. If there is text then you should make continuation of the text based on that, please don't write already exisitng text but just a continuination. 
    Here is the context of the document: ${context}
    Here is the users response: ${usersResponse}`
  );
  res.json(completedSentence.response.text());
});

export { router as completionWithContext };
