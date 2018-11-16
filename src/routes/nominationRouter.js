import _ from 'lodash';
import {PaymentService} from 'Service';

const express = require('express');
const router = express.Router();

router.get('/:id/payment', (req, res, next) => {
    return PaymentService.getPaymentByPaymentId(req).then((results) => {
        if (results instanceof Error){
            next(results);
        } else {
            res.json(!_.isEmpty(results) ? results : []);
        }
    });
});


module.exports = router;