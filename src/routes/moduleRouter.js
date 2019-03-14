import _ from 'lodash';
import { GET, POST, PUT } from 'HttpMethods';
import { ModuleService, SupportDocService, CandidateService } from 'Service';
import { createRoutes } from '../middleware/Router';
import ModuleManager from '../manager/module/moduleManager';
import { MODULE_EDIT_SCHEMA, GET_MODULE_BY_ID_SCHEMA } from './schema/moduleSchema';

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
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/module/12222?max=123234567
			method: GET,
			path: '/modules/:category/support-docs',
			schema: {},
			handler: (req, res, next) => {
				return SupportDocService.getsupportDocsByCategory(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));

			},
		},
		{
			// curl -H "Content-Type: application/json" -X POST -d '{"candidateConfig":["fullName","nic","dateOfBirth","gender"],"supportDocConfigData":["birthCertificate","nic"]}' http://localhost:9001/ec-election/modules/455cd89e-269b-4b69-96ce-8d7c7bf44ac2/candidate-form-config
			method: POST,
			path: '/modules/:moduleId/candidate-form-config',
			handler: (req, res, next) => {
				let candidate_config_result;
				const candidate_config = CandidateService.saveCandidateConfig(req)
					.then((result) => candidate_config_result = result)
					.catch((error) => next(error));
				if(!_.isEmpty(candidate_config)){
					const candidate_suppport_doc_config = CandidateService.saveCandidateSupportDocConfigData(req)
						.then((result) => res.status(200).send({
							"candidateConfig": candidate_config_result,
							"supportDocConfigData": result
						}))
						.catch((error) => next(error));

				}
			}
		},
		// {
		// 	method: GET,
		// 	path: '/election-modules',
		// 	handler: (req, res, next) => {
		// 	  return ModuleService.saveElectionModule(req)
		// 	  .then((result) => res.status(200).send(result))
		// 				  .catch(error => next(error));
		// 	},
		// },
		{
			method: POST,
			path: '/election-modules',
			handler: (req, res, next) => {
			  return ModuleService.saveElectionModule(req)
			  .then((result) => res.status(200).send(result))
						  .catch(error => next(error));
			},
		},
		{
			method: PUT,
			path: '/election-modules/:moduleId',
			handler: (req, res, next) => {
			  return ModuleService.saveElectionModule(req)
			  .then((result) => res.status(200).send(result))
						  .catch(error => next(error));
			},
		},
		// {
		// 	method: GET,
		// 	path: '/election-modules/:moduleID',
		// 	handler: (req, res, next) => {
		// 	  return ModuleService.saveElectionModule(req)
		// 	  .then((result) => res.status(200).send(result))
		// 				  .catch(error => next(error));
		// 	},
		// },
		// {
		// 	method: DELETE,
		// 	path: '/election-modules/:moduleID',
		// 	handler: (req, res, next) => {
		// 	  return ModuleService.saveElectionModule(req)
		// 	  .then((result) => res.status(200).send(result))
		// 				  .catch(error => next(error));
		// 	},
		// },
	]);
};
