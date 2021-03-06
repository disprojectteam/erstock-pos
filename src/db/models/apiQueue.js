const mongoose = require('mongoose');
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
    sentAt: {
        type: Date
    },
    sentBy: {
        type: String
    },
    refObjectId: {
        type: ObjectId
    }

}, { timestamps: true });

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

var ApiQueue = mongoose.model('ApiQueue', ApiQueueSchema);

module.exports = ApiQueue 