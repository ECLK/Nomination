import _ from 'lodash';
import { GET, POST ,PUT} from 'HttpMethods';
import { reviewService } from 'Service';
import { createRoutes } from '../middleware/Router';

const paymentRouter = createRoutes();

export const initReviewRouter = (app) => {
    paymentRouter(app, [
        {
            // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/review/378a33e1-5ad0-42f1-9403-dc9dbba32f4c/payments
            method: PUT,
            path: '/review/:paymentId/payments',
           // schema: {},
            handler: (req, res, next) => {
                 return reviewService.putPaymentsBypaymentId(req)
                 	.then((result) => res.status(200).send(result))
                 	.catch(error => next(error));

            },
        },
        {
            // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/payments/378a33e1-5ad0-42f1-9403-dc9dbba32f4c/note
            method: PUT,// /payments/:payment_id/note
            path: '/payments/:paymentId/note',
            // schema: {},
            handler: (req, res, next) => {
                return reviewService.putPaymentNoteBypaymentId(req)
                    .then((result) => res.status(200).send(result))
                    .catch(error => next(error));

            },
        },
    ]);
};
