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

var inventSumSchema = new mongoose.Schema({
    itemId: {
        type: String
    },
    barcode: {
        type: String
    },
    physicalQty: {
        type: Number
    },
    availableQty: {
        type: Number
    },
    reservedQty: {
        type: Number
    },
    storeId: {
        type: String
    },
    status: {
        type: String,
        enum: Object.values(Status),
    },
    lastModifiedTime: {
        type: Date
    },
    createdTime: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    errorCount: {
        type: Number,
        default: 0
    }
});


inventSumSchema.pre('save', function (next) {
    this.createdTime = Date.now();
    next();
});

Object.assign(inventSumSchema.statics, {
    Status
});


var InventSum = conn.model('InventSum', inventSumSchema);

module.exports = { InventSum } 