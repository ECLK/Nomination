import Swagger from './Swagger';
import {initRoutes} from '../routes/routerAggregator';
import Logger from './Logger';
import {initErrorMiddleware} from './ErrorMiddleware'


export const bindMiddlewares = async (app) => {
  Logger(app);
  await Swagger(app);
  initRoutes(app);
  initErrorMiddleware(app);
};
