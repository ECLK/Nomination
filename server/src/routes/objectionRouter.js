import _ from 'lodash';
import { GET, POST } from 'HttpMethods';
import {ObjectionService} from 'Service';
import {createRoutes} from '../middleware/Router';
import {OBJECTION_EDIT_SCHEMA, GET_OBJECTION_BY_ID_SCHEMA} from './schema/objectionSchema';

const objectionRouter = createRoutes();

export const initObjectionRouter = (app) => {
  objectionRouter(app, [
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/objection/12222?max=123234567
      method: GET,
      path: '/objections/:objectionId',
      schema: GET_OBJECTION_BY_ID_SCHEMA,
      handler: (req, res, next) => {
        return ObjectionService.getObjectionByObjectionId(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
      // curl -H "Content-Type: application/json" -X POST -d '{"id":176484, "description":"Surath"}' http://localhost:9001/ec-election/objection
      method: POST,
      path: '/objections',
      schema: OBJECTION_EDIT_SCHEMA,
      handler: (req, res, next) => {
        return ObjectionService.updateObjectionByObjectionId(req)
        .then(() => res.status(200).send())
        .catch(error => next(error));
      },
    },
    {
      method: GET,
      path: '/elections/:electionId/teams/:teamId/objections',
      schema: {},
      handler: (req, res, next) => {
          return ObjectionService.getObjectionCreatedByTeam(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
      },
  },
  ]);
};



