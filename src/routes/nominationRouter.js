import _ from 'lodash';
import { GET, POST, PUT } from 'HttpMethods';
import {createRoutes} from '../middleware/Router';
import { PaymentService, CandidateService,SupportDocService, } from 'Service';
import {SAVE_PAYMENT_SCHEMA, UPDATE_PAYMENT_SCHEMA, SAVE_SUPPORT_DOC_SCHEMA, UPDATE_SUPPORT_DOC_SCHEMA, SAVE_CANDIDATE_SCHEMA, SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA} from './schema/nominationSchema';
import {HTTP_CODE_404,HTTP_CODE_201,HTTP_CODE_200} from '../routes/constants/HttpCodes';

const nominationRouter = createRoutes();

export const initNominationRouter = (app) => {
    nominationRouter(app, [
      {
        method: GET,
        path: '/nominations/:nominationId/candidates',
        schema: {},
        handler: (req, res, next) => {
          return CandidateService.getCandidateListByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
  
        },
      },
      {
        method: POST,
        path: '/nominations/candidates',
        schema: SAVE_CANDIDATE_SCHEMA,
        handler: (req, res, next) => {
          return CandidateService.saveCandidateByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))

          .catch(error => next(error));
        },
      },
      {
        method: GET,
        path: '/nominations/:nominationId/candidates/:candidateId',
        schema: {},
        handler: (req, res, next) => {
          return CandidateService.getCandidateByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
  
        },
      },
      // {
      //   method: POST,
      //   path: '/nominations/candidates/:candidateId/support-docs',
      //   schema: SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA,
      //   handler: (req, res, next) => {
      //     return CandidateService.saveCandidateSupportDocsByCandidateId(req)
      //     .then((result) => res.status(HTTP_CODE_201).send(result))
      //     .catch(error => next(error));
      //   },
      // },
      {
        method: GET,
        path: '/nominations/:nominationId/payments',
        schema: {},
        handler: (req, res, next) => {
          return PaymentService.getPaymentByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: POST,
        path: '/nominations/payments',
        schema: SAVE_PAYMENT_SCHEMA,
        handler: (req, res, next) => {
          return PaymentService.createPaymentByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: PUT,
        path: '/nominations/:nominationId/payments',
        schema: UPDATE_PAYMENT_SCHEMA,
        handler: (req, res, next) => {
          return PaymentService.updatePaymentByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: GET,
        path: '/nominations/:nominationId/support-docs',//TODO: check bulk insert function 
        handler: (req, res, next) => {
          return SupportDocService.getsupportDocsByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: POST,
        path: '/nominations/support-docs',
        schema: SAVE_SUPPORT_DOC_SCHEMA,
        handler: (req, res, next) => {
          return SupportDocService.saveSupportDocsByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: PUT,
        path: '/nominations/:nominationId/support-docs',
        // schema: UPDATE_SUPPORT_DOC_SCHEMA,
        handler: (req, res, next) => {
          return SupportDocService.updateSupportDocsByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      }
    ]);
  };
