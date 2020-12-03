let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
    var tableSvc = azure.createTableService('miscprojectsstorage',process.env["TableStorageAccessKey"]);
    let query = new azure.TableQuery()
    .where("RowKey == 'distance'");
    let r = await queryEntities(tableSvc, 'paintingshopcompletevalues', query, null);
    let entity = r.entries[0];
    if (r.entries.length > 0) {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: entity.value._,
        headers: {
            'Content-Type': 'application/json'
        }
      };
    }
}

async function queryEntities(tableService, ...args) {
  return new Promise((resolve, reject) => {
      let promiseHandling = (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      };
      args.push(promiseHandling);
      tableService.queryEntities.apply(tableService, args);
  });
};