
const { InventDocument } = require('../../models/inventDocument');
const router = require('express').Router();
const _ = require('lodash');
const { TraceLog } = require('../../models/traceLog');

// post / 
router.post('/', async (req, res) => {
    try {
        var body = _.pick(req.body, ['documentId', 'docType', 'countType', 'documentDate', 'warehouse', 'wmsCountLines', 'sentBy'])
        var inventDocument = new InventDocument(body)
        await inventDocument.save()
        await res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
        TraceLog.addLogData(error, " ", __filename)
    }
});

module.exports = { router };