import _ from 'lodash';
import {ElectionService, PaymentService} from 'Service';
import NominationEntryManager from '../manager/nomination/nominationEntryManager';


const express = require('express');
const router = express.Router();
 
//Save All Initial Nomination Raws By Divisions and Teams - Will be updated when saving nomination by Teams
router.post('/nomination_open', (req, res, next) => {
  return ElectionService.saveNominationById(req).then((results) => {
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

/**
 * EC admin get pending payment details of all nominations by election id
 */
router.get('/:election_id/pending-payments', (req, res, next) => {
  return PaymentService.getAllPendingPayments(req).then((result) => {
      if (result instanceof Error) {
          next(result);
      } else {
        console.log(result);
          // res.send(result);
          res.json(!_.isEmpty(result) ? NominationEntryManager.mapToNominationEntryModel(result) : []);

      }
  });
});

/**
 * EC admin get paid payment details of all nominations by election id
 */
router.get('/:election_id/paid-payments', (req, res, next) => {
  return PaymentService.getAllPaidPayments(req).then((result) => {
      if (result instanceof Error) {
          next(result);
      } else {
        console.log(result);
          // res.send(result);
          res.json(!_.isEmpty(result) ? NominationEntryManager.mapToNominationEntryModel(result) : []);

      }
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