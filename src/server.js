
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
require('./db/loaders/mongoose');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use('/', routes);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);
if (process.env.NODE_PORT)
    app.listen(process.env.NODE_PORT, () => {
        console.log(`ERSTOCK POS Started up at port ${process.env.NODE_PORT}`);
    });
else
    app.listen(3031, () => {
        console.log(`ERSTOCK POS Started up at port 3031`);
    });
