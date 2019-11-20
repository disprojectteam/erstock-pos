const router = require('express').Router();
const _ = require('lodash');
const inventDocument = require('./inventDocument');
const { ApiQueue } = require('./../../models/apiQueue');
const { TraceLog } = require('./../../models/traceLog');



router.use('/inventDocument', inventDocument.router);


// post / commit
router.post('/commit/', async (req, res) => {
    try {
        var body = _.pick(req.body, ['documentName', 'ids', 'userName'])
        const result = await ApiQueue.updateMany({ refObjectId: { $in: body.ids }, documentName: body.documentName },
            { $set: { isSent: 'true', sentAt: Date.now(), sentBy: body.userName } }, { new: true })
        await res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error);
        TraceLog.addLogData(error, " ", __filename);
    }
});


module.exports = router;