import { initUserRouter } from './userRouter';
import { initDefaultRouter } from './defaultRouter';
import { initTeamRouter } from './teamRouter';
import { initNominationRouter } from './nominationRouter';
import { initElectionRouter } from './electionRouter';

export const initRoutes = (app) => {
  initUserRouter(app);
  initDefaultRouter(app);
  initTeamRouter(app);
  initNominationRouter(app);
  initElectionRouter(app);
};
