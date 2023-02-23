import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import log from './logger.js';
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  log.info(`Server started in port ${port}`);
});
