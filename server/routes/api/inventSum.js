const { TraceLog } = require('./../../models/traceLog');
const router = require('express').Router();
const { InventSum } = require('../../models/inventSum');


// GET /lookupChange
router.get('/:storeId',async (req, res) => {
    try {
        let _storeId = req.params.storeId;
        const result=await InventSum.find({ storeId:_storeId });
        res.send({ result: result})
        res.end();
    } catch (err) {
        res.status(400).send(err.error);
        res.end();
        TraceLog.addLogData(err, " ", __filename);
    }
});


router.get('/:storeId/:barcode',  async (req, res) => {
    try {
        let _storeId = req.params.storeId;
        let _barcode = req.params.barcode;
        const result=await InventSum.find({ storedId: _storeId, barcode:_barcode });
        res.send({ result: result })
        res.end();
    } catch (err) {
        res.status(400).send(err.error);
        res.end();
        TraceLog.addLogData(err, " ", __filename);
    }
});


module.exports = { router };