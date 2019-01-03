import _ from 'lodash';
import { GET } from 'HttpMethods';
import { ObjectionService } from 'Service';
import { createRoutes } from '../middleware/Router';

const objectionRouter = createRoutes();

export const initObjectionRouter = (app) => {
    objectionRouter(app, [
        {
            method: GET,
            path: '/elections/:electionId/teams/:teamId/objections',
            schema: {},
            handler: (req, res, next) => {
                return ObjectionService.getObjectionCreatedByTeam(req)
                .then((result) => res.status(200).send(result))
                .catch(error => next(error));
            },
        },
    ]);
};


