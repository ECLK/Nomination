import _ from 'lodash';
import { GET, POST } from 'HttpMethods';
import {DivisionService} from 'Service';
import {createRoutes} from '../middleware/Router';
import {DIVISION_EDIT_SCHEMA, GET_DIVISION_BY_ID_SCHEMA} from './schema/divisionSchema';

const divisionRouter = createRoutes();

export const initDivisionRouter = (app) => {
  divisionRouter(app, [
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/division/12222?max=123234567
      method: GET,
      path: '/divisions/:divisionId',
      schema: GET_DIVISION_BY_ID_SCHEMA,
      handler: (req, res, next) => {
        return DivisionService.getDivisionByDivisionId(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
      // curl -H "Content-Type: application/json" -X POST -d '{"id":176484, "name":"Surath"}' http://localhost:9001/ec-election/division
      method: POST,
      path: '/divisions',
      schema: DIVISION_EDIT_SCHEMA,
      handler: (req, res, next) => {
        return DivisionService.updateDivisionByDivisionId(req)
        .then(() => res.status(200).send())
        .catch(error => next(error));
      },
    },
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

