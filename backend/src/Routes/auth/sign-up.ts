import express from 'express';

const router = express.Router();

router.post('/sign-up', (req, res) => {
  res.send('Sign up route');
});

export { router as signUp };
