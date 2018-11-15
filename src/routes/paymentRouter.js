import _ from 'lodash';
import {PaymentService} from 'Service';
import PaymentManager from '../manager/payment/paymentManager';

const express = require('express');
const router = express.Router();

router.get('/:uid', (req, res, next) => {
  return PaymentService.getPaymentByPaymentId(req).then((results) => {
    if(results instanceof Error)
      next(results);
    else
      // res.json(!_.isEmpty(results) ? PaymentManager.mapToPaymentModel(results) : []);
      res.json(!_.isEmpty(results) ? results : []);
  });
});

router.post('/', (req, res, next) => {
  return PaymentService.updatePaymentByPaymentId(req).then((results) => {
    console.log("Request body", req.body.id);
    if(results instanceof Error)
      next(results);
    else
      res.json(results);
  });
});

router.get('/', function(req, res){
  res.send('get payment home');
});


module.exports = router;