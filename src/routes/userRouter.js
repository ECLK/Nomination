import {UserService} from 'Service';

const express = require('express');
const router = express.Router();

router.get('/:uid', (req, res, next) => {
  return UserService.getUserByUserId(req).then((result) => {
    if(result instanceof Error)
      next(result);
    else
      res.json(result);
  });
});

module.exports = router;