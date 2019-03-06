import _ from 'lodash';
import { GET, POST ,PUT} from 'HttpMethods';
import { reviewService } from 'Service';
import { createRoutes } from '../middleware/Router';

const paymentRouter = createRoutes();

export const initReviewRouter = (app) => {
    paymentRouter(app, [
        {
            // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/payments
            method: PUT,
            path: '/review/:paymentId/payments',
           // schema: {},
            handler: (req, res, next) => {
                 return reviewService.putPaymentsBypaymentId(req)
                 	.then((result) => res.status(200).send(result))
                 	.catch(error => next(error));

            },
        }
    ]);
};
