import _ from 'lodash';
import { TeamService } from 'Service';

const express = require('express');
const router = express.Router();


/**
 * 9th to get team details by team id
 */
router.get('/:team_id', (req, res, next) => {
	return TeamService.getTeamById(req).then((result) => {
		if (result instanceof Error){
			next(result);
		} else {
			res.json(!_.isEmpty(result) ? result : []);
		}
	});
});


/**
 * 10th to update team details under selected team_id
 */
router.put('/:team_id', (req, res, next) => {
	return TeamService.updateTeamById(req).then( (result) => {
		if (result instanceof Error){
			next(result);
		} else {
			res.json(!_.isEmpty(result) ? result : []);
		}
	});
});


module.exports = router;