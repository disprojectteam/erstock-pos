const mongoose = require('mongoose');
const { conn } = require('../db/mongoose-erstock-pos');

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
    createdTime: {
        type: Date
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
});


inventDocumentSchema.pre('save', function (next) {
    this.createdTime = Date.now();
    next();
});

Object.assign(inventDocumentSchema.statics, {
    Status
});


var InventDocument = conn.model('InventDocument', inventDocumentSchema);

module.exports = { InventDocument } 