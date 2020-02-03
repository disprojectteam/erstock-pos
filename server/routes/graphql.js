const express = require('express');
var app = express();
const graphqlController = require('../controller/graphqlController');
app.use('/graphql', graphqlController);
