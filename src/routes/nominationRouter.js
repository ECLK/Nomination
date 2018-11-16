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

router.post('/:nomination_id/payment', (req, res, next) => {
    return PaymentService.createPaymentByNominationId(req).then( (results) => {
        if (results instanceof Error){
            next(results);
        } else {
            res.json(results);
        }
    });
});


module.exports = router;