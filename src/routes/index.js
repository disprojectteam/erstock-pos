const router = require('express').Router();
const api = require('./api');
const graphqlController = require('../controller/graphqlController');


router.use('/api', api);
router.use('/graphql', graphqlController);
router.get('/', (req, res) => {
    res.send("Hello World !! I am running POS.!!")
});

module.exports = router;