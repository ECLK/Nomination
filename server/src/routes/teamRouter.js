import _ from 'lodash';
import { GET, POST, PUT, DELETE } from 'HttpMethods';
import {TeamService,UploadService,ValidationService} from 'Service';
import {createRoutes} from '../middleware/Router';
import {SAVE_TEAM_SCHEMA,UPDATE_TEAM_SCHEMA} from './schema/teamSchema';
import {HTTP_CODE_201, HTTP_CODE_200} from '../routes/constants/HttpCodes';


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
    {
      method: GET,
      path: '/teams',
      schema: {},
      handler: (req, res, next) => {
        return TeamService.getAllTeams(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
      method: GET,
      path: '/teams/:teamType/withType',
      schema: {},
      handler: (req, res, next) => {
        return TeamService.getAllTeamsByTeamType(req)
        .then((result) => res.status(200).send(result))
        .catch(error => next(error));

      },
    },
    {
			method: POST,
      path: '/teams',
      schema: SAVE_TEAM_SCHEMA,
			handler: (req, res, next) => {
				return TeamService.createTeam(req)
					.then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
			},
    },
    {
      method: PUT,
      path: '/teams/:teamId',
      schema: UPDATE_TEAM_SCHEMA,
      handler: (req, res, next) => {
        return TeamService.updateTeamById(req)
        .then((result) => res.status(HTTP_CODE_201).send(result))
        .catch(error => next(error));
      },
    },
    {
      method: DELETE,
      path: '/teams/:teamId',
      handler: (req, res, next) => {
        return TeamService.deletePartyById(req)
        .then((result) => res.status(HTTP_CODE_201).send(result))
					.catch(error => next(error));
      },
    },
    {
			method: GET,
			path: '/image-download/:sid',
			handler: (req, res, next) => {
				// console.log(req);
				var downloadSid = req.params.sid;
				console.log("downloadSid",downloadSid);
				return UploadService.getDownloadImage(downloadSid,res,next)
				.catch(error => next(error));
			},
      },
      {
        method: GET,
        path: '/teams/validations/:partyName',
        schema: {},
        handler: (req, res, next) => {
          return ValidationService.validatePartyByPartyName(req)
            .then((result) => res.status(HTTP_CODE_201).send(result))
            .catch(error => next(error));
        }
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

