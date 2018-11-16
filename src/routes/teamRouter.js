import _ from 'lodash';
import {UserService} from 'Service';


const express = require('express');
const router = express.Router();


/**
 * 9th to get team details by team id
 */
router.get('/:team_id', (req, res, next) => {
        res.json(results);
});

/**
 * 10th to update team details under selected team_id
 */
router.put('/:team_id', (req, res, next) => {
        res.json(results);

});




module.exports = router;