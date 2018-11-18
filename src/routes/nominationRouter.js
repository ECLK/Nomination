import _ from 'lodash';
import { NominationService } from 'Service';
import { PaymentService } from 'Service';

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Nominations");
});

/**
 * 3rd EC admin get payment details of all nominations 
 */
router.get('/payments', (req, res, next) => {
    return PaymentService.getAllPayments().then((result) => {
        if (result instanceof Error) {
            next(result);
        } else {
            res.send(result);
        }
    });
});
/**
 * 4th EC admin get payment details of selected nomination 
 */
router.get('/:nomination_id/payment', (req, res, next) => {
    res.send(req.params);
    return PaymentService.getPaymentByNominationId(req).then((results) => {
        if (results instanceof Error) {
            next(results);
        } else {
            res.json(!_.isEmpty(results) ? results : []);
        }
    });
});

/**
 * 5th EC admin update payment status 
 * {
 * payment_status : pending | accept | reject 
 * }*/
router.put('/:nomination_id/payment/status', (req, res, next) => {
    var nomination_id = req.params.nomination_id;
    var status = req.params.status;
    return PaymentService.updatePaymentStatusByNominationId(nomination_id, status).then((result) => {
        if (result instanceof Error) {
            next(result);
        } else {
            res.send(result);
        }
    });
});

/**  
 *  6th to get allowed nomiantion list for division wise  */
router.get('/list/:election_id/:team_id', (req, res, next) => {
    return NominationService.getNominationByTeamId(req).then( (result) => {
        if (result instanceof Error) {
            next(result);
        } else {
            res.send(result);
        }
    });
});

/** Completed - not tested 
 * 7th to get candidates details with respect to a nomination */
router.get('/:nomination_id/candidate', (req, res) => {
    return NominationService.getCandidateListByNominationID(req).then((results) => {
        res.json(results);
    });

})

/**
 * 11th - adding a new payment relates to particular nomination id 
 */
router.post('/:nomination_id/payment/', (req, res, next) => {
    return PaymentService.createPaymentByNominationId(req).then((results) => {
        if (results instanceof Error) {
            next(results);
        } else {
            res.json(results);
        }
    });
});

/**
 * 12th - update certain payment details for particular nomination id
 * editable feilds: depositor, deposit_amount, deposite_date, uploaded_file_name
 */
router.put('/:nomination_id/payment/update', (req, res, next) => {
    return PaymentService.updatePaymentByNominationId(req).then((result) => {
        if (result instanceof Error) {
            next(result);
        } else {
            res.send(result);
        }
    });
});


/** Completed - not tested 
 * 8th to put  added or updated nominated candidate details */
/*body{
    candidate_id:
    nic:
    name:
    occupation:
    address:
    nomination_id:
}
sample
{
    "candidate_id":"2312",
    "nic":"3412424",
    "name":"dkshfdg",
    "occupation":"kdafsf",
    "address":"kahfsf",
    "nomination_id":"2132"
}

*/
router.put('/add_candidates', (req, res) => {
    return NominationService.updateNominationCandidates(req).then((results) => {
        res.json(results);
    });
});


module.exports = router;