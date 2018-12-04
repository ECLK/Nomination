import _ from 'lodash';
import { GET, POST } from 'HttpMethods';
import {createRoutes} from '../middleware/Router';

import { NominationService, PaymentService, CandidateService, } from 'Service';
import {GET_PAYMENT_BY_NOMINATION_ID_SCHEMA, GET_CANDIDATE_BY_NOMINATION_ID_SCHEMA} from './schema/nominationSchema';


const nominationRouter = createRoutes();

export const initNominationRouter = (app) => {
    nominationRouter(app, [
      {
        // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/nomination/12222?max=123234567/candidate
        method: GET,
        path: '/nomination/:nominationId/candidate',
        schema: GET_CANDIDATE_BY_NOMINATION_ID_SCHEMA,
        handler: (req, res, next) => {
          console.log("kkkkkkkkk");
          return CandidateService.getCandidateListByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
  
        },
      },
      {
        // curl -H "Content-Type: application/json" -X POST -d '{"id":1234, "name":"Surath"}' http://localhost:9001/ec-election/user
        method: GET,
        path: '/:nominationId/payment',
        schema: GET_PAYMENT_BY_NOMINATION_ID_SCHEMA,
        handler: (req, res, next) => {
          console.log("dkjfhdfh");
          return PaymentService.getPaymentByNominationId(req)
          .then(() => res.status(200).send())
          .catch(error => next(error));
        },
      }
    ]);
  };
