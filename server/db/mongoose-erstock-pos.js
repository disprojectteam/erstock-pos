
var mongoose = require('mongoose');


//mongoose.plugin(toJson);
mongoose.set('useFindAndModify', false);


//mongoose.Promise = global.Promise;


    var conn = mongoose.createConnection(`mongodb://${process.env.Mongo_User}@${process.env.Erdis_Mongo_IP}/ErstockPos?authSource=admin`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    



module.exports = { conn };
