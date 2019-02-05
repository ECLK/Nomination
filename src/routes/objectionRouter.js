import _ from 'lodash';
import { GET } from 'HttpMethods';
import { ObjectionService } from 'Service';
import { createRoutes } from '../middleware/Router';

const objectionRouter = createRoutes();

export const initObjectionRouter = (app) => {
    objectionRouter(app, [
        {
            // eg: curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/teams/62fcdfa7-3c5a-405f-b344-79089131dd8e/objections
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


