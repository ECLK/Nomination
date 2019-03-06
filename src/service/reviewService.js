import _ from 'lodash';
import { ServerError, ApiError } from 'Errors';
import Payment from '../repository/payment';
import ReviewRepo from '../repository/review';
import { PaymentManager } from 'Managers';
import { NominationService } from 'Service';
import { HTTP_CODE_404, HTTP_CODE_204 } from '../routes/constants/HttpCodes';
const uuidv4 = require('uuid/v4');


const putPaymentsBypaymentId = async (req) => {
    return await ReviewRepo.updatePaymentStatus(req.params.paymentId, req.body.status);
};



export default {
    putPaymentsBypaymentId
}
