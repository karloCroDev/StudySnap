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
    'Tell me exactly what is written in this image. Please use native language to the image that is writtren',
  ]);
  fs.unlinkSync(path); // Deleting the image, saving rescources because it is not needed anymore after the AI has processed it
  res.json(result.response.text());
});

export { router as imageNoteResponse };
