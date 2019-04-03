import _ from 'lodash';
import { GET, POST, PUT } from 'HttpMethods';
import {ActiveElectionService} from 'Service';
import {createRoutes} from '../middleware/Router';
import ActiveElectionManager from '../manager/activeElection/activeElectionManager';
import {ACTIVE_ELECTION_EDIT_SCHEMA, GET_ACTIVE_ELECTION_BY_ID_SCHEMA} from './schema/activeElectionSchema';
import { HTTP_CODE_404, HTTP_CODE_201, HTTP_CODE_200 } from '../routes/constants/HttpCodes';


const activeElectionRouter = createRoutes();

export const initActiveElectionRouter = (app) => {
  activeElectionRouter(app, [
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/activeElection/12222?max=123234567
      method: GET,
      path: '/activeElections/:activeElectionId',
      schema: GET_ACTIVE_ELECTION_BY_ID_SCHEMA,
      handler: (req, res, next) => {
        return ActiveElectionService.getActiveElectionByActiveElectionId(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
      // curl -H "Content-Type: application/json" -X POST -d '{"id":176484, "name":"Surath"}' http://localhost:9001/ec-election/activeElection
      //TODO: yujith, remove this after complete the schema function on saving call election end points 
      method: POST,
      path: '/activeElections',
      schema: ACTIVE_ELECTION_EDIT_SCHEMA,
      handler: (req, res, next) => {
        return ActiveElectionService.updateActiveElectionByActiveElectionId(req)
        .then((result) => res.status(200).send(result))
					.catch(error => next(error));
      },
    },
    {
      method: POST,
      path: '/activeElectionsData',
      handler: (req, res, next) => {
        return ActiveElectionService.saveActiveElectionData(req)
        .then((result) => res.status(200).send(result))
					.catch(error => next(error));
      },
    },
    {
      method: PUT,
      path: '/activeElectionsData/:electionId',
      handler: (req, res, next) => {
        return ActiveElectionService.saveActiveElectionData(req)
        .then((result) => res.status(200).send(result))
					.catch(error => next(error));
      },
    },
    {
			method: POST,
			path: '/activeElections/:electionId/approve-active-election',
			handler: (req, res, next) => {
				return ActiveElectionService.saveApproveElectionByElectionId(req)
					.then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
			},
		},
  ]);
};
