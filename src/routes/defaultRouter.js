const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Api is working fine !');
});

router.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

module.exports = router;