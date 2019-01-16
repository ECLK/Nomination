import { initUserRouter } from './userRouter';
import { initDefaultRouter } from './defaultRouter';
import { initTeamRouter } from './teamRouter';
import { initNominationRouter } from './nominationRouter';
import { initElectionRouter } from './electionRouter';
import { initDivisionRouter } from './divisionRouter';
import { initModuleRouter } from './moduleRouter';
import { initObjectionRouter } from './objectionRouter';
import { initActiveElectionRouter } from './activeElectionRouter';
import { initElectionNominationRouter } from './electionNominationRouter';

export const initRoutes = (app) => {
  initUserRouter(app);
  initDefaultRouter(app);
  initTeamRouter(app);
  initNominationRouter(app);
  initElectionRouter(app);
  initDivisionRouter(app);
  initModuleRouter(app);
  initObjectionRouter(app);
  initActiveElectionRouter(app);
  initElectionNominationRouter(app);
};
