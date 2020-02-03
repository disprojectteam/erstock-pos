const { InventDocument } = require('../models/inventDocument');
class dataService {

    saveData(graph) {
        try {
            const iDoc = new InventDocument({
                docRefId: graph.docRefId,
                docType: graph.docType,
                storeId: graph.storeId,
                isReservation: graph.isReservation
            });
            iDoc.save();
        }
        catch (err) {
            console.log(err);
        }
    }

    async find(reqData) {
        try {
            const dataArray = []
            const x = await InventDocument.find({ storeId: reqData.storeId });

            for (var i = 0; i < x.length; i++) {
                const data = x[i];
                dataArray.push({
                    docRefId: data.docRefId,
                    storeId: data.storeId
                });
            }
            return dataArray;
            //return x[0];
        }
        catch (ex) {
            console.log(ex);
        }

    }


    async findOne(reqData) {
        try {
            return await InventDocument.findOne({ storeId: reqData.storeId });
        }
        catch (ex) {
            console.log(ex);
        }

    }

    async deleteOne(reqData){
        try{
            await InventDocument.deleteOne({ docRefId: reqData.docRefId, storeId: reqData.storeId }, (err) => {
                if (err)
                    return err;
                else 
                    return(reqData.storeId, 'is deleted');
            });
        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    async deleteByStore(reqData){
        try{
            await InventDocument.deleteMany({ storeId: reqData.storeId }, (err) => {
                if (err)
                    return err;
                else 
                    return(reqData.storeId, 'is deleted');
            });
        }
        catch(ex)
        {
            console.log(ex);
        }
    }
}


var DataService = new dataService();
module.exports = DataService;