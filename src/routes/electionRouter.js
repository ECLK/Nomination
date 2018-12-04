import _ from 'lodash';
import {UserService} from 'Service';


const express = require('express');
const router = express.Router();

/**
 * 1st get election details 
 */
router.get('/:election_id', (req, res, next) => {
    return aaa.aaaa(req).then((results) => {
        res.json(results);
    });
});

/**2nd end point
 * EC admin nomination opening at the begining of the election. 
 */
router.post('/nomination_open', (req, res, next) => {
  return aaa.aaaa(req).then((results) => {
      res.json(results);
  });
});



module.exports = router;