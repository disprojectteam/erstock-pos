const mongoose = require('mongoose');
const { conn } = require('../db/mongoose-erstock-pos');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ApiQueueSchema = new mongoose.Schema({

    documentName: {
        type: String
    },
    keyValue: {
        type: String
    },
    isSent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
    sentAt: {
        type: Date
    },
    sentBy: {
        type: String
    },
    refObjectId: {
        type: ObjectId
    }

});

ApiQueueSchema.statics.add = function (_id, _documentName, _documentValue) {
    var apiQueue = this;

    apiQueue.findOne({ refObjectId: _id, isSent: false }).then((result) => {
        if (!result._id) {
            new ApiQueue({
                documentName: _documentName,
                keyValue: _documentValue,
                isSent: false,
                refObjectId: _id
            }).save();
        }
    });
}

ApiQueueSchema.index({ documentName: 1, refObjectId: 1 }, { unique: true });

var ApiQueue = conn.model('ApiQueue', ApiQueueSchema);

module.exports = { ApiQueue } 