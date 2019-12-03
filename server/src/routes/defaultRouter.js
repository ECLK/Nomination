import { GET } from 'HttpMethods';
import {UserService} from 'Service';
import {createRoutes} from '../middleware/Router';


const defaultRouter = createRoutes();

export const initDefaultRouter = (app) => {
  defaultRouter(app, [
    {
      // curl -H "Content-Type: application/json" -X GET http://localhost:9001/ec-election
      method: GET,
      path: '/',
      schema: {},
      handler: (req, res, next) => {
        res.send('Api is working fine !');
      },
    }
  ]);
};
