let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
    var tableSvc = azure.createTableService('miscprojectsstorage',process.env["TableStorageAccessKey"]);
    var uniqueID = uuidv4();
    var entity = {
        PartitionKey: {'_':'1'},
        RowKey: {'_':uniqueID},
        Email: {'_':context.req.body.email},
        Orders: {'_':JSON.stringify(context.req.body.orders)}
    };
    tableSvc.insertEntity('paintingshopcomplete',entity, function (error, result, response) {
        if(!error){
          // Entity inserted
        }
      });
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Inserted!"
    };
}