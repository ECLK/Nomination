import { initUserRouter } from './userRouter';
import { initDefaultRouter } from './defaultRouter';
import { initTeamRouter } from './teamRouter';
import { initNominationRouter } from './nominationRouter';
import { initElectionRouter } from './electionRouter';
import { initObjectionRouter } from './objectionRouter';
import { initDivisionRouter } from './divisionRouter';
import { initModuleRouter } from './moduleRouter';
export const initRoutes = (app) => {
  initUserRouter(app);
  initDefaultRouter(app);
  initTeamRouter(app);
  initObjectionRouter(app);
  initNominationRouter(app);
  initElectionRouter(app);
  initDivisionRouter(app);
  initModuleRouter(app);
};
