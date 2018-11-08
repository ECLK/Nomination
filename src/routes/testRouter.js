const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('test router!');
});

router.get('/list', (req, res) => {
    res.send('test list!');
});

router.get('/:mid/', (req, res, next) => {
  return EmployeeShiftService.getEmployeeShiftsByMerchantId(req).then((result) => {
    if(result instanceof Error)
      next(result);
    else
      res.json(result);
  });
});

module.exports = router;