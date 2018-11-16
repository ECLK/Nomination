import {TeamService} from 'Service';

const express = require('express');
const router = express.Router();
 


// var uid=1; this comes from session
router.get('/:uid', (req, res, next) => {
  return TeamService.getTeamByUserId(req).then((result) => {
    if(result instanceof Error)
      next(result);
    else
    console.log(result);
      res.json(result[0]);
  });
});

//insert team data in Teams table
// router.post('/data', function(req, res) {
//   console.log("--->",req.body);
//   res.send(req.body);
// });

//update team data in Teams table
router.put('/:tid/update', (req, res, next) => {
  return TeamService.updateTeamByTeamId(req).then((results) => {
    console.log("Request body", req.body.id);
    if(results instanceof Error)
      next(results);
    else
      res.json(results);
  });
});


module.exports = router;