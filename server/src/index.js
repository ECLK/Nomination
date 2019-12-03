import 'dotenv/config';
import { injectAppConfigs } from './config/ConfigService';

injectAppConfigs();

require('./middleware/express');

process.on('uncaughtException', error => {
  throw new Error(error, 'Uncaught exception');
});
