import { initUserRouter } from './userRouter';
import { initDefaultRouter } from './defaultRouter';

export const initRoutes = (app) => {
  initUserRouter(app);
  initDefaultRouter(app);
};
