import _ from 'lodash';
import { GET, POST, PUT } from 'HttpMethods';
import { FieldOptionService } from 'Service';
import { createRoutes } from '../middleware/Router';

const fieldOptionsRouter = createRoutes();

export const initFieldOptionsRouter = (app) => {
	fieldOptionsRouter(app, [
		{
			method: GET,
			path: '/field-options/:fieldName',
			handler: (req, res, next) => {
				let fieldName = req.params.fieldName;
			    return FieldOptionService.getFieldOptions(fieldName)
			    .then((result) => res.status(200).send(result))
				.catch(error => next(error));
			},
		},
		{
			method: GET,
			path: '/field-options/:fieldName/:moduleId',
			handler: (req, res, next) => {
				let fieldName = req.params.fieldName;
				let moduleId = req.params.moduleId;
			    return FieldOptionService.getCallElectionFieldOptions(fieldName,moduleId)
			    .then((result) => res.status(200).send(result))
				.catch(error => next(error));
			},
		}
		// {
		// 	method: GET,
		// 	path: '/permission',
		// 	handler: (req, res, next) => {
		// 		console.log(req.jwt);
		// 	    return FieldOptionService.getPermissionsByUserRole(req.headers)
		// 	    .then((result) => res.status(200).send(result))
		// 		.catch(error => next(error));
		// 	},
		// }
	]);
};
