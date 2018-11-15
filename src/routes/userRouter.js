import _ from 'lodash';
import {UserService} from 'Service';
import UserManager from '../manager/user/userManager';

const express = require('express');
const router = express.Router();

router.get('/:uid', (req, res, next) => {
  return UserService.getUserByUserId(req).then((results) => {
    if(results instanceof Error)
      next(results);
    else
      res.json(!_.isEmpty(results) ? UserManager.mapToUserModel(results) : []);
  });
});

router.post('/', (req, res, next) => {
  return UserService.updateUserByUserId(req).then((results) => {
    console.log("Request body", req.body.id);
    if(results instanceof Error)
      next(results);
    else
      res.json(results);
  });
});



module.exports = router;