const mongoose = require('mongoose');

const Status = Object.freeze({
    N: 'None',
    P: 'Processing',
    C: 'Completed',
    F: 'Failed',
    I: 'Invalid',
    E: 'Exist'
});


var inventTransSchema = new mongoose.Schema({
    barcode: {
        type: String
    },
    itemId: {
        type: String
    },
    inventDimId: {
        type: String
    },
    qty: {
        type: Number
    },
    reservedQty: {
        type: Number
    }
});

var inventDocumentSchema = new mongoose.Schema({
    docRefId: {
        type: String
    },
    docType: {
        type: String
    },
    storeId: {
        type: String
    },
    totalQtyAbs: {
        type: Number
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.N
    },
    completedAt: {
        type: Date
    },
    completedLines: {
        type: Array
    },
    errorCount: {
        type: Number,
        default: 0
    },
    isReservation: {
        type: Boolean
    },
    inventTransStatus: {
        type: String,
        enum: Object.values(Status),
        defaut: Status.N
    },
    inventTrans: [inventTransSchema]
}, { timestamps: true });




Object.assign(inventDocumentSchema.statics, {
    Status
});


var InventDocument = mongoose.model('InventDocument', inventDocumentSchema);

module.exports = InventDocument 