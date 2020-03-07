import _ from 'lodash';
import { GET , POST} from 'HttpMethods';
import { ElectionService, NominationService, ValidationService } from 'Service';
import { createRoutes } from '../middleware/Router';
import { GET_ELECTION_BY_ID_SCHEME } from './schema/electionSchema';


const electionRouter = createRoutes();

export const initElectionRouter = (app) => {
	electionRouter(app, [
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections
			method: GET,
			path: '/elections',
			schema: {},
			handler: (req, res, next) => {
				return ElectionService.getAllElections(req)
					.then( (result) => res.status(200).send(result))
					.catch( error => next(error));
			}
		},
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/status/PENDING
			method: GET,
			path: '/elections/status/:status',
			schema: {},
			handler: (req, res, next) => {
				return ElectionService.getElectionsByStatus(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			}
		},
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/status/PENDING
			method: GET,
			path: '/elections/validations/:electionName',
			schema: {},
			handler: (req, res, next) => {
				return ValidationService.validateElectionsByElectionName(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			}
		},
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/status/PENDING
			method: GET,
			path: '/elections/forDemo/new',
			schema: {},
			handler: (req, res, next) => {
				return ElectionService.getElectionIdForDemo(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			}
		},
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6
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
			// eg: http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/teams/5eedb70e-a4da-48e0-b971-e06cd19ecc70/nominations/approve
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
            // dev test:- http://localhost:9001/ec-election/election/election-config
            method: POST,
            path: '/election/election-config',
            //schema: {},
            handler: (req, res, next) => {
                return ElectionService.insertTest(req)
					.then((result) => res.status(200).send(result))
                    .catch( error => next(error));
            },
        },
        {
            // dev test:- http://localhost:9001/ec-election/election/election-config
            method: GET,
            path: '/election/election-config',
            //schema: {},
            handler: (req, res, next) => {
                return ElectionService.GetElectionConfig(req)
                    .then((result) => res.status(200).send(result))
                    .catch( error => next(error));

            },
        },
        //election/

        {
            // dev test:- http://localhost:9001/ec-election/election/election-config/: election_module_id
            method: GET,
            path: '/election/election-config/:election_module_id',
            schema: {},
            handler: (req, res, next) => {
                return ElectionService.getElectionConfigById(req)
                    .then((result) => res.status(200).send(result))
                    .catch( error => next(error));

            },
        },
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/status/PENDING
			method: GET,
			path: '/elections/electionStatus/:status',
			schema: {},
			handler: (req, res, next) => {
				return ElectionService.getElectionsByStatusName(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			}
		},
	]);
};
