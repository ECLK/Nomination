const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Nomination router!');
});

router.get('/:nomination_id/payment', (req, res) => {
    res.send('Nomination payments :');
});


module.exports = router;