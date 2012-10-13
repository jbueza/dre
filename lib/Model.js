var logger = require("winston"),
    azure = require("azure"),
    uuid = require("node-uuid"),
    request = require("request");

Model = function Constructor(definition, account) {
  if (!options) {
    logger.error("Invalid model constructor definition");
    return false;
  }
  if (!account) {
    logger.error("Invalid account information upon model instantiation.");
    return false;
  }

  logger.info("Model instantiated");

  this.options = options;
  this.account = account;
  this.tableService = azure.createTableService();
  return this;
};

Model.prototype.findOne(query, callback) {
  if (!callback || typeof callback != 'function') {
    logger.error("Invalid callback");
    throw new Error("Invalid callback");
  }

  var tableService = azure.createTableService();

};

Model.prototype.save = function SaveStorageEntity(err, callback) {
  if (err) {
    throw new Error(err);
  }
}



module.exports = Model;
