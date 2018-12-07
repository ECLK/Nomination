import _ from 'lodash';
import { GET, POST, PUT } from 'HttpMethods';
import {createRoutes} from '../middleware/Router';
import { PaymentService, CandidateService,SupportDocService, } from 'Service';
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
          return CandidateService.getCandidateListByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
  
        },
      },
      {
        // curl -H "Content-Type: application/json" -X POST -d '{"id":1234, "name":"Surath"}' http://localhost:9001/ec-election/nomination/12222?max=123234567/payment
        method: GET,
        path: '/nomination/:nominationId/payment',
        schema: GET_PAYMENT_BY_NOMINATION_ID_SCHEMA,
        handler: (req, res, next) => {
          return PaymentService.getPaymentByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
        },
      },
      {
        // curl -H "Content-Type: application/json" -X POST -d '{"id":1234, "name":"Surath"}' http://localhost:9001/ec-election//nomination/payment
        method: POST,
        path: '/nomination/payment',
        handler: (req, res, next) => {
          return PaymentService.createPaymentByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
        },
      },
      {
        // curl -H "Content-Type: application/json" -X POST -d '{"id":1234, "name":"Surath"}' http://localhost:9001/ec-election/nomination/12222?max=123234567/payment
        method: PUT,
        path: '/nomination/:nominationId/payment',
        handler: (req, res, next) => {
          return PaymentService.updatePaymentByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
        },
      },
      {
        // curl -H "Content-Type: application/json" -X POST -d '{"id":1234, "name":"Surath"}' http://localhost:9001/nomination/12222?max=123234567/support-docs
        method: GET,
        path: '/nomination/:nominationId/support-docs',
        handler: (req, res, next) => {
          return SupportDocService.getsupportDocsByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
        },
      },
      {
        // curl -H "Content-Type: application/json" -X POST -d '{"id":1234, "name":"Surath"}' http://localhost:9001/ec-election/nomination/support-docs
        method: POST,
        path: '/nomination/support-docs',
        handler: (req, res, next) => {
          return SupportDocService.saveSupportDocsByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
        },
      },
      {
        // curl -H "Content-Type: application/json" -X POST -d '{"id":1234, "name":"Surath"}' http://localhost:9001/ec-election//nomination/12222?max=123234567/support-docs
        method: PUT,
        path: '/nomination/:nominationId/support-docs',
        handler: (req, res, next) => {
          return SupportDocService.updateSupportDocsByNominationId(req)
          .then((result) => res.status(200).send(result))
          .catch(error => next(error));
        },
      }
    ]);
  };
