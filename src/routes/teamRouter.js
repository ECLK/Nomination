import {TeamService} from 'Service';

const express = require('express');
const router = express.Router();

// var uid=1; this comes from session
router.get('/:uid', (req, res, next) => {
  return TeamService.getTeamByUserId(req).then((result) => {
    if(result instanceof Error)
      next(result);
    else
      res.json(result);
  });
});

//insert team data in Teams table
router.post('/data', function(req, res) {
  console.log("--->",req.body);
});

module.exports = router;