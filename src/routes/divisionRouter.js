import _ from 'lodash';
import { GET } from 'HttpMethods';
import { DivisionService} from 'Service';
import { createRoutes } from '../middleware/Router';

const divisionRouter = createRoutes();

export const initDivisionRouter = (app) => {
	divisionRouter(app, [
		{
			// dev test: http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/divisions/
			method: GET,
			path: '/elections/:electionId/divisions/',
			schema: {},
			handler: (req, res, next) => {
				return DivisionService.getDivisionsByElectionId(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			},
		},
		{
			// dev test: http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/teams/5eedb70e-a4da-48e0-b971-e06cd19ecc70/divisions
			method: GET,
			path: '/elections/:electionId/teams/:teamId/divisions',
			schema: {},
			handler: (req, res, next) => {
				return DivisionService.getDivisionsWithNomination(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			},
		},
	]);
};