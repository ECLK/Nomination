import _ from 'lodash';
import { GET } from 'HttpMethods';
import { ElectionService, NominationService, DivisionService} from 'Service';
import { createRoutes } from '../middleware/Router';
import { GET_ELECTION_BY_ID_SCHEME } from './schema/electionSchema';


const electionRouter = createRoutes();

export const initElectionRouter = (app) => {
	electionRouter(app, [
		{
			method: GET,
			path: '/elections/:electionId',
			schema: GET_ELECTION_BY_ID_SCHEME,
			handler: (req, res, next) => {
				return ElectionService.getElectionByIdWithTimelineData(req)
					.then( (result) => res.status(200).send(result))
					.catch( error => next(error));
			},
		},
		{
			//todo: create sub endpoint for division for the following endpoint
			// get: /elections/{election_id}/teams/{team_id}/nominations/{status}
			// eg:- http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/teams/5eedb70e-a4da-48e0-b971-e06cd19ecc70/nominations/approve
			method: GET,
			path: '/elections/:electionId/teams/:teamId/nominations/:status',
			schema: {},
			handler: (req, res, next) => {
				return NominationService.getNominationByStatus(req)
					.then((result) => res.status(200).send(result))
					.catch( error => next(error));
			},
		},
		{
			// eg:- http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/divisions/
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
			// //
			// method: GET,
			// path: '/elections/:electionId/nominations/',
			// schema: {},
			// handler: (req, res, next) => {
			// 	return 
			// }
		}
	]);
};
