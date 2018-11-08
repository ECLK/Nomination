import 'dotenv/config';
import './middleware/express';

process.on('uncaughtException', error => {
  throw new Error(error, 'Uncaught exception');
});
