import _ from 'lodash';
import { GET, POST } from 'HttpMethods';
import {DivisionService} from 'Service';
import {createRoutes} from '../middleware/Router';
import DivisionManager from '../manager/division/divisionManager';
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
    }
  ]);
};
