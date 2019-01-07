import { initUserRouter } from './userRouter';
import { initDefaultRouter } from './defaultRouter';
import { initTeamRouter } from './teamRouter';
import { initElectionRouter } from './electionRouter';
import { initObjectionRouter } from './objectionRouter';
import { initDivisionRouter } from './divisionRouter';

export const initRoutes = (app) => {
  initUserRouter(app);
  initDefaultRouter(app);
  initTeamRouter(app);
  initObjectionRouter(app);
  initElectionRouter(app);
  initDivisionRouter(app);
};
