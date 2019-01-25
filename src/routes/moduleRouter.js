import _ from 'lodash';
import { GET, POST } from 'HttpMethods';
import {ModuleService} from 'Service';
import {createRoutes} from '../middleware/Router';
import ModuleManager from '../manager/module/moduleManager';
import {MODULE_EDIT_SCHEMA, GET_MODULE_BY_ID_SCHEMA} from './schema/moduleSchema';

const moduleRouter = createRoutes();

export const initModuleRouter = (app) => {
  moduleRouter(app, [
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/module/12222?max=123234567
      method: GET,
      path: '/modules/:moduleId',
      schema: GET_MODULE_BY_ID_SCHEMA,
      handler: (req, res, next) => {
        return ModuleService.getModuleByModuleId(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/module/12222?max=123234567
      method: GET,
      path: '/modules/:status/all',
      schema: GET_MODULE_BY_ID_SCHEMA,
      handler: (req, res, next) => {
        return ModuleService.getModulesByStatus(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
      // curl -H "Content-Type: application/json" -X POST -d '{"id":176484, "name":"Surath"}' http://localhost:9001/ec-election/module
      method: POST,
      path: '/modules',
      schema: MODULE_EDIT_SCHEMA,
      handler: (req, res, next) => {
        return ModuleService.updateModuleByModuleId(req)
        .then(() => res.status(200).send())
        .catch(error => next(error));
      },
    },
      {
          // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/modules/candidate-config/columns
          method: GET,
          path: '/modules/candidate-config/columns',
          schema: {},
          handler: (req, res, next) => {
              return ModuleService.getColumnNamesFromCandidateConfig(req)
                  .then((result) => res.status(200).send(result))
                  .catch(error => next(error));
          },
      },
      {
          // curl -H "Content-Type: application/json" -X POST -d '{"id":176484, "name":"Surath"}' http://localhost:9001/ec-election/module
          method: POST,
          path: '/modules/division-config',
         // schema: MODULE_EDIT_SCHEMA,
          handler: (req, res, next) => {
              return ModuleService.InsertDivisionConfig(req)
                  .then(() => res.status(200).send())
                  .catch(error => next(error));
          },
      },
      {
          // dev test:- http://localhost:9001/ec-election/modules/election-config
          method: POST,
          path: '/modules/election-config',
          //schema: {},
          handler: (req, res, next) => {
              return ModuleService.insertTOElectionModuleConfigData(req)
                  .then((result) => res.status(200).send(result))
                  .catch( error => next(error));
          },
      },
      {
          // dev test:- http://localhost:9001/ec-election/modules/election-config
          method: GET,
          path: '/modules/election-config/key-values',
          //schema: {},
          handler: (req, res, next) => {
              return ModuleService.GetFromElectionModuleConfig(req)
                  .then((result) => res.status(200).send(result))
                  .catch( error => next(error));

          },
      },
      {
          // dev test:- http://localhost:9001/ec-election/modules/election-config/: election_module_id
          method: GET,
          path: '/modules/election-config/:election_module_id',
          schema: {},
          handler: (req, res, next) => {
              return ModuleService.getElectionModuleConfigDataById(req)
                  .then((result) => res.status(200).send(result))
                  .catch( error => next(error));

          },
      }

  ]);
};
