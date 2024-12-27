// Etxernal packages
import express from 'express';
import cors from 'cors';
import Module from 'node:module';
import * as routes from './Routes/exports';

// Config
import { port } from './Config/config';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.use('', routes.completion);
app.use('', routes.completionWithContext);
app.use('', routes.imageNoteResponse);
app.use('', routes.quizz);

app.listen(4000, () => {
  console.log(`Server is running on 4000 ${4000}`);
});
