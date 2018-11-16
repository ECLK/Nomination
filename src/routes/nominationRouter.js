import _ from 'lodash';
import { NominationService} from 'Service';


const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Nominations");
});

/** to get candidates details with respect to a nomination */
router.get('/:nomination_id/candidate',(req,res)=>{
    return NominationService.getCandidateListByNominationID(req).then((results)=>{
        res.json(results);
    });

})

/** to get allowed nomiantion list for division wise  */
router.get('/nominationlist/:election_id/:team_id',(req,res) => {
     return NominationService.getNominationByTeamId(req).then((results) => {   
         res.json(results);
        });
});

/**to put  added or updated nominated candidate details */
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