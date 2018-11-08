import Swagger from './Swagger';
import Router from './Router';
import Logger from './Logger';

export const bindMiddlewares = async (app) => {
  Logger(app);
  await Swagger(app);
  Router(app);
};
