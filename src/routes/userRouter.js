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