// Etxternal packages
import express from 'express';
import multer from 'multer';
import fs from 'fs';

// Config
import { modelPro } from '../Config/config';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/gemini-images'),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage });

router.post('/add-image', upload.single('file'), async (req, res) => {
  const path = req.file?.path;
  if (path === undefined) {
    res.json('Please enter a valid image');
    return;
  }

  const result = await modelPro.generateContent([
    {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType: 'image/jpeg',
      },
    },
    'Please analyze the image and generate concise summary notes based on the text it contains. If the image does not include any text, provide a brief and accurate description of its content instead. Please ensure that the notes are relevant and informative and that they use MARKDOWN FORMAT.',
  ]);
  fs.unlinkSync(path); // Deleting the image, saving rescources because it is not needed anymore after the AI has processed it
  res.json(path);
});

export { router as imageNoteResponse };
