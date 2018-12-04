import { GET, POST } from 'HttpMethods';
import {TeamService} from 'Service';
import {createRoutes} from '../middleware/Router';
import UserManager from '../manager/user/userManager';
import {USER_EDIT_SCHEMA, GET_USER_BY_ID_SCHEMA} from './schema/userSchema';

const teamRouter = createRoutes();

export const initTeamRouter = (app) => {
  teamRouter(app, [
    {
      method: GET,
      path: '/teams/:teamId',
      schema: {},
      handler: (req, res, next) => {
        return TeamService.getTeamById(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
  ]);
};


/**
 * Refer commented code for team update @Clemant
 */
// import _ from 'lodash';
// import { TeamService } from 'Service';
//
// const express = require('express');
// const router = express.Router();
//
//
// /**
//  * 9th to get team details by team id
//  */
// router.get('/:team_id', (req, res, next) => {
// 	return TeamService.getTeamById(req).then((result) => {
// 		if (result instanceof Error){
// 			next(result);
// 		} else {
// 			res.json(!_.isEmpty(result) ? result : []);
// 		}
// 	});
// });
//
//
// /**
//  * 10th to update team details under selected team_id
//  */
// router.put('/:team_id', (req, res, next) => {
// 	return TeamService.updateTeamById(req).then( (result) => {
// 		if (result instanceof Error){
// 			next(result);
// 		} else {
// 			res.json(!_.isEmpty(result) ? result : []);
// 		}
// 	});
// });
//
//
// module.exports = router;

