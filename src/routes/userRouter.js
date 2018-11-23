import _ from 'lodash';
import { GET, POST } from 'HttpMethods';
import {UserService} from 'Service';
import {createRoutes} from '../middleware/Router';
import UserManager from '../manager/user/userManager';
import {USER_EDIT_SCHEMA, GET_USER_BY_ID_SCHEMA} from './schema/userSchema';

const userRouter = createRoutes();

export const initUserRouter = (app) => {
  userRouter(app, [
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election/user/12222?max=123234567
      method: GET,
      path: '/user/:userId',
      schema: GET_USER_BY_ID_SCHEMA,
      handler: (req, res, next) => {
        return UserService.getUserByUserId(req).then((results) => {
          if(results instanceof Error)
            next(results);
          else
            res.json(!_.isEmpty(results) ? UserManager.mapToUserModel(results) : []);
        });
      },
    },
    {
      // curl -H "Content-Type: application/json" -X POST -d '{"id":176484, "name":"Surath"}' http://localhost:9001/ec-election/user
      method: POST,
      path: '/user',
      schema: USER_EDIT_SCHEMA,
      handler: (req, res, next) => {
        return UserService.updateUserByUserId(req)
        .then(() => res.status(200).send())
        .catch(error => next(error));
      },
    }
  ]);
};