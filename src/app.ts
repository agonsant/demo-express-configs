import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import debugCreator from 'debug';

const debug = debugCreator('server');
const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});

app.listen(port, () => {
  debug(`Server started in port ${port}`);
});
