import _ from 'lodash';
import { NominationService} from 'Service';

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Nominations");
});

/**
 * 3rd EC admin get payment details of all nominations 
 */
router.get('/payments', (req, res) => {
    res.send("Nominations");
});

/**
 * 4th EC admin get payment details of selected nomination 
 */
router.get('/:nomination_id/payment', (req, res) => {
    res.send("Nominations");
});

/**
 * 5th EC admin update payment status 
 * {
 * payment_status : pending | accept | reject 
 * }*/
router.put('/:nomination_id/payment/', (req, res) => {
    res.send("Nominations");
});

/** Completed - not tested 
 *  6th to get allowed nomiantion list for division wise  */
router.get('/nominationlist/:election_id/:team_id',(req,res) => {
    return NominationService.getNominationByTeamId(req).then((results) => {   
        res.json(results);
       });
});

/** Completed - not tested 
 * 7th to get candidates details with respect to a nomination */
router.get('/:nomination_id/candidate',(req,res)=>{
    return NominationService.getCandidateListByNominationID(req).then((results)=>{
        res.json(results);
    });

})


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