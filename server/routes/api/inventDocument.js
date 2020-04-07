
const { InventDocument } = require('../../models/inventDocument');
const router = require('express').Router();
const _ = require('lodash');
// const { TraceLog } = require('../../models/traceLog');

// post / 
router.post('/', async (req, res) => {
    try {
        var body = _.pick(req.body, ['docRefId', 'docType', 'storeId', 'totalQtyAbs', 'isReservation', 'inventTrans', 'sentBy'])
        var inventDocument = new InventDocument(body)
        await inventDocument.save()
        await res.status(200).send()
    } catch (error) {
        if(error.name == 'MongoError')
        {
            res.status(400).send('Database error occured.(1)')
        }
        else if(error.name == 'CastError')
        {
            res.status(400).send('Data model error occured.(1)')
        }
        else if(error.name == 'TypeError')
        {
            res.status(500).send('Type error occured.(1)')
        }
        else if(error.name == 'StatusCodeError' && error.message.search('E11000') >= 0 ) 
        {
            res.status(400).send('Data duplication error occured.(1)')
        }
        else if(error.name == 'ValidationError')
        {
            res.status(403).send(error.message)
        }
        else
        {
            res.status(400).send(error.message)
        }
        // TraceLog.addLogData(error, " ", __filename)
    }
});

module.exports = { router };