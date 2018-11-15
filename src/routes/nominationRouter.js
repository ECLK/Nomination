import _ from 'lodash';
import { NominationService} from 'Service';
//import nomiantionEntryManager from '../manager/nomiantion/nomiantionEntryManager';
//import nomiantionEntryManager from '../manager/nomiantion/nomiantionEntryManager';

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Nominations");
});

/** to get allowed nomiantion list for division wise  */
router.get('/nominationlist/:election_id/:team_id',(req,res) => {
     return NominationService.getNominationByTeamId(req).then((results) => {   
        if(results instanceof Error)
            next(results);
        else
            res.json(!_.isEmpty(results) ? nomiantionEntryManager.mapToUserModel(results) : []);
        });
});

// router.get('/:nomination_id/payment', (req, res) => {
//     res.send('Nomination payments :');
// });


module.exports = router;