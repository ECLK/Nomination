import _ from 'lodash';
import { GET, POST, PUT } from 'HttpMethods';
import { createRoutes } from '../middleware/Router';
import { PaymentService, CandidateService, SupportDocService, NominationService,DivisionService } from 'Service';
import { SAVE_PAYMENT_SCHEMA, UPDATE_PAYMENT_SCHEMA, SAVE_SUPPORT_DOC_SCHEMA, UPDATE_SUPPORT_DOC_SCHEMA, SAVE_CANDIDATE_SCHEMA, SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA, SAVE_NOMINATION_APPROVE_SCHEMA } from './schema/nominationSchema';
import { HTTP_CODE_404, HTTP_CODE_201, HTTP_CODE_200 } from '../routes/constants/HttpCodes';



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
		{
			// curl -H "Content-Type: application/json" -X PUT -d '{ "fullName" : "W Clement Amila Fernando", "preferredName" : "Clement", "nic": "883202091V", "dateOfBirth": 1549490224, "gender": "MALE", "address": "55/11, 1ST Gemunu Lane, Subhuthipura, Battaramulla.", "occupation": "SSE", "electoralDivisionName": "Kotte", "electoralDivisionCode": "26", "counsilName": "counsil_name" }' http://localhost:9001/ec-election/candidates/1d986c33-0e3d-4e27-9ff3-a8b03118408c
			method: PUT,
			path: '/candidates/:candidateId',
			schema: SAVE_CANDIDATE_SCHEMA,
			handler: (req, res, next) => {
				return CandidateService.updateCandidateDataById(req)
					.then((result) => res.status(HTTP_CODE_200).send(result))
					.catch(error => next(error));
			}
		},
		//TODO : yujith, this function is not compleate yet
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
			handler: (req, res, next) => {
				// console.log(req);
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
			path: '/nominations/:nominationId/support-docs',
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
			schema: UPDATE_SUPPORT_DOC_SCHEMA,
			handler: (req, res, next) => {
				return SupportDocService.updateSupportDocsByNominationId(req)
					.then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
			},
		},
		{
			method: POST,
			path: '/nominations/:nominationId/approve-nomination',
			schema: SAVE_NOMINATION_APPROVE_SCHEMA,
			handler: (req, res, next) => {
				return NominationService.saveApproveNominationByNominationId(req)
					.then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
			},
		},
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/teams/5eedb70e-a4da-48e0-b971-e06cd19ecc70/divisions
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

