import {ElectionService} from 'Service';

const express = require('express');
const router = express.Router();
 
//Save All Initial Nomination Raws By Divisions and Teams - Will be updated when saving nomination by Teams
router.post('/', (req, res, next) => {
  return ElectionService.saveNominationById(req).then((results) => {
    console.log("Request body", req.body.id);
    if(results instanceof Error)
      next(results);
    else
      res.json(results);
  });
});

// var eid=1; 
router.get('/:eid', (req, res, next) => {
  return ElectionService.getElectionByElectionId(req).then((result) => {
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
  return ElectionService.updateTeamByTeamId(req).then((results) => {
    console.log("Request body", req.body.id);
    if(results instanceof Error)
      next(results);
    else
      res.json(results);
  });
});


module.exports = router;