const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

router.get('/', (req, res) => {
    res.send("Hello World !! I am running POS.!!")
});

module.exports = router;