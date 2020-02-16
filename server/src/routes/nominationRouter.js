import _ from 'lodash';
import { GET, POST, PUT, DELETE } from 'HttpMethods';
import { createRoutes } from '../middleware/Router';
import { PaymentService, CandidateService, SupportDocService, NominationService, UploadService} from 'Service';
import { SAVE_PAYMENT_SCHEMA, UPDATE_PAYMENT_SCHEMA, SAVE_SUPPORT_DOC_SCHEMA, UPDATE_SUPPORT_DOC_SCHEMA, SAVE_CANDIDATE_SCHEMA, SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA, SAVE_NOMINATION_APPROVE_SCHEMA } from './schema/nominationSchema';
import { HTTP_CODE_404, HTTP_CODE_201, HTTP_CODE_200 } from '../routes/constants/HttpCodes';
const multer = require('multer');
const zip = require('express-zip');


// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
})

var upload = multer({ storage: storage })

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
		// {
		// 	method: POST,
		// 	path: '/nominations/candidates',
		// 	schema: SAVE_CANDIDATE_SCHEMA,
		// 	handler: (req, res, next) => {
		// 		return CandidateService.saveCandidateByNominationId(req)
		// 			.then((result) => res.status(HTTP_CODE_201).send(result))
		// 			.catch(error => next(error));
		// 	},
		// },
		{
			method: POST,
			path: '/nominations/candidates',
			handler: (req, res, next) => {
			  return CandidateService.saveCandidateByNominationId_old(req)
			  .then((result) => res.status(200).send(result))
						  .catch(error => next(error));
			},
		},
		{
			method: PUT,
			path: '/nominations/candidates/:moduleId',
			handler: (req, res, next) => {
			  return ModuleService.saveCandidateByNominationId(req)
			  .then((result) => res.status(200).send(result))
			  .catch(error => next(error));
			},
		},
		{
			method: DELETE,
			path: '/nominations/:candidateId/candidates',
			schema: {},
			handler: (req, res, next) => {
				return CandidateService.deleteCandidateByCandidateId(req)
					.then((result) => res.status(HTTP_CODE_200).send(result))
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
			path: '/nominations/:candidateId/candidates',
			schema: SAVE_CANDIDATE_SCHEMA,
			handler: (req, res, next) => {
				console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu",req);
				return CandidateService.updateCandidateDataById(req)
					.then((result) => res.status(HTTP_CODE_200).send(result))
					.catch(error => next(error));
			}
		},
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/nominations/a0e4a9c9-4841-45df-9600-f7a607400ab6/payments
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
				return PaymentService.createPaymentByNominationId(req)
					.then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
			},
		},
		{
			method: PUT,
			path: '/nominations/:paymentId/payments',
			// schema: UPDATE_PAYMENT_SCHEMA,
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
			method: GET,
			path: '/nominations/:candidateId/candidate/support-docs',
			handler: (req, res, next) => {
				return SupportDocService.getsupportDocsByCandidateId(req)
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
			method: POST,
			path: '/nominations/candidate/support-docs',
			handler: (req, res, next) => {
				return SupportDocService.saveCandidateSupportDocsByCandidateId(req)
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
			method: PUT,
			path: '/nominations/:nominationId/update-nomination-status',
			handler: (req, res, next) => {
				return SupportDocService.updateNominationStatusByNominationId(req)
					.then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
			},
		},
		{
			method: POST,
			path: '/upload',
			handler: (req, res, next) => {
				upload.single(req)
					.then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
			},
		},
		{
			method: GET,
			path: '/nominations/:electionId/pending-nominations/:status/team/:teamId/divisions/:divisionId',
			handler: (req, res, next) => {
				return NominationService.getPendingNominationsByElectionId(req)
					.then((result) => res.status(HTTP_CODE_200).send(result))
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
		method: POST,
		path: '/file-upload',
		handler: (req, res, next) => {
			// console.log(req);
			return UploadService.uploadFile(req)
			.then((result) => res.status(HTTP_CODE_201).send(result))
			.catch(error => next(error));
		},
		},
		{
			method: GET,
			path: '/file-download/:sid',
			handler: (req, res, next) => {
				// console.log(req);
				var downloadSid = req.params.sid;
				console.log("downloadSid",downloadSid);
				return UploadService.getDownloadFilePath(downloadSid,res)
				.then((result) => res.status(HTTP_CODE_201).send(result))
				.catch(error => next(error));
			},
			},
		{
			method: GET,
			path: '/nominations/:electionId/payment-status',
			handler: (req, res, next) => {
				return NominationService.getNominationPaymentStatusByElectionId(req)
					.then((result) => res.status(HTTP_CODE_200).send(result))
					.catch(error => next(error));
			},
		},
		{
			method: GET,
			path: '/nominations/:nominationId/key-name/:keyName',
			handler: (req, res, next) => {
				return NominationService.getNominationDataByNominationId(req)
					.then((result) => res.status(HTTP_CODE_200).send(result))
					.catch(error => next(error));
			},
		},
		{
			method: GET,
			path: '/nominations/candidates/:candidateId/support-docs/:documentId/download',
			handler: (req, res, next) => {
				return SupportDocService.getSupportDocsByCandidateIdAndDocId(req)
					.then((result) => res.download('./src/uploads/'+ result[0]['SUPPORT_DOC_filename']))
					.catch(error => next(error));
			},
		},
		{
			method: GET,
			path: '/nominations/:nominationId/support-docs/:documentId/download',
			handler: (req, res, next) => {
				return SupportDocService.getSupportDocByNominationIdAndDocId(req)
					.then((result) => res.download('./src/uploads/'+ result[0]['SUPPORT_DOC_filename']))
					.catch(error => next(error));
			},
		},
		{
			method: GET,
			path: '/nominations/candidates/:candidateId/support-docs/download',
			handler: (req, res, next) => {
				return SupportDocService.getSupportDocsByCandidateIdNumber(req)
					.then((result) => res.zip(result))
					.catch(error => next(error));
			},
		},
		{
			method: GET,
			path: '/nominations/:nominationId/support-docs/download',
			handler: (req, res, next) => {
				return SupportDocService.getSupportDocsByNominationIdNumber(req)
					.then((result) => res.zip(result))
					.catch(error => next(error));
			},
		},
		// {
		//   method: POST,
		//   path: '/upload',
		//   // schema: SAVE_SUPPORT_DOC_SCHEMA,
		//   handler: (req, res, next) => {
		//     console.log("=====t========",req.acceptedFiles);
		//   let imageFile = req.files.file;

		//   imageFile.mv(`../public/${req.body.filename}.jpg`, function(err) {
		//     if (err) {
		//       return res.status(500).send(err);
		//     }

		//     res.json({file: `public/${req.body.filename}.jpg`});
		//   });
		//   },
		// },
	]);
};
