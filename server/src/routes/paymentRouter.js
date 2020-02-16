import _ from 'lodash';
import { GET, POST,PUT  } from 'HttpMethods';
import { PaymentService, SupportDocService } from 'Service';
import { createRoutes } from '../middleware/Router';

const paymentRouter = createRoutes();

export const initPaymentRouter = (app) => {
	paymentRouter(app, [
		{
			// curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/payments
			method: GET,
			path: '/elections/:electionId/payments',
			schema: {},
			handler: (req, res, next) => {
				return PaymentService.getPaymentsByElectionId(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));

			},
			
		},
		{
            // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/review/378a33e1-5ad0-42f1-9403-dc9dbba32f4c/payments
            method: PUT,
            path: '/elections/:paymentId/payments',
        //    schema: {},
            handler: (req, res, next) => {
				 return PaymentService.putPaymentsBypaymentId(req)
                 	.then((result) => res.status(200).send(result)) 
                 	.catch(error => next(error));

            },
		},
		{
            // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/review/378a33e1-5ad0-42f1-9403-dc9dbba32f4c/payments
            method: PUT,
            path: '/elections/:paymentId/paymentNote',
        //    schema: {},
            handler: (req, res, next) => {
				 return PaymentService.savePaymentNoteBypaymentId(req)
                 	.then((result) => res.status(200).send(result)) 
                 	.catch(error => next(error));

            },
		},
		{
			method: GET,
			path: '/nomination-payments/:divisionId',
			schema: {},
			handler: (req, res, next) => {
				return PaymentService.getAllPayments(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			},
			
		},
		{
			method: GET,
			path: '/payment-serial',
			schema: {},
			handler: (req, res, next) => {
				return PaymentService.getRealSerialNumber(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			},
			
		},
		{
			method: GET,
			path: '/payments/:nominationId/validate',
			schema: {},
			handler: (req, res, next) => {
				return PaymentService.validatePaymentId(req)
					.then((result) => res.status(200).send(result))
					.catch(error => next(error));
			},
			
		},
		{
			method: GET,
			path: '/payments/:paymentId/download',
			schema: {},
			handler: (req, res, next) => {
				return SupportDocService.getSupportDocsByPaymentId(req)
					.then((result) => res.download('./src/uploads/'+ result[0]['SUPPORT_DOC_filename']))
					.catch(error => next(error));
			},

		},
		
	]);
};
