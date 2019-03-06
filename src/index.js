import 'dotenv/config';
import './middleware/express';
import { injectAppConfigs } from './config/ConfigService';

injectAppConfigs();
process.on('uncaughtException', error => {
  throw new Error(error, 'Uncaught exception');
});
