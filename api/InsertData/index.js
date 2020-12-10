let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  var tableSvc = azure.createTableService('miscprojectsstorage', process.env["TableStorageAccessKey"]);
  var uniqueID = uuidv4();
  var entity = {
    PartitionKey: { '_': '1' },
    RowKey: uniqueID,
    Email: context.req.body.email,
    Orders: JSON.stringify(context.req.body.orders)
  };
  tableSvc.insertEntity('paintingshopcomplete', entity, function (error, result, response) {
    if (!error) {
      // Entity inserted
    }
  });
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Inserted!"
  };
}