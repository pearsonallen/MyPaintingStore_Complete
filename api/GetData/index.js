let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
    var tableSvc = azure.createTableService('miscprojectsstorage',process.env["TableStorageAccessKey"]);
    let r = await queryEntities(tableSvc, 'paintingshopcomplete', null, null);
    if (r.entries.length > 0) {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: r.entries,
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