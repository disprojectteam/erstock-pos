
var mongoose = require('mongoose');


//mongoose.plugin(toJson);
mongoose.set('useFindAndModify', false);


//mongoose.Promise = global.Promise;


    var conn = mongoose.createConnection(`mongodb://${"erdisAdmin:Erdis123*"}@${"erdis.eroglu.com:27017"}/ErstorePos?authSource=admin`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    



module.exports = { conn };
