import _ from 'lodash';
import { GET, POST } from 'HttpMethods';
import {ElectionNominationService} from 'Service';
import {createRoutes} from '../middleware/Router';
import ElectionNominationManager from '../manager/electionNomination/electionNominationManager';
import {ELECTION_NOMINATION_EDIT_SCHEMA, GET_ELECTION_NOMINATION_BY_ID_SCHEMA} from './schema/electionNominationSchema';

const electionNominationRouter = createRoutes();

export const initElectionNominationRouter = (app) => {
  electionNominationRouter(app, [
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/electionNomination/12222?max=123234567
      method: GET,
      path: '/electionNominations/:electionNominationId',
      schema: GET_ELECTION_NOMINATION_BY_ID_SCHEMA,
      handler: (req, res, next) => {
        return ElectionNominationService.getElectionNominationByElectionNominationId(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
      // curl -H "Content-Type: application/json" -X POST -d '{"id":176484, "name":"Surath"}' http://localhost:9001/ec-election/electionNomination
      method: POST,
      path: '/electionNominations',
      schema: ELECTION_NOMINATION_EDIT_SCHEMA,
      handler: (req, res, next) => {
        return ElectionNominationService.updateElectionNominationByElectionNominationId(req)
        .then(() => res.status(200).send())
        .catch(error => next(error));
      },
    }
  ]);
};
