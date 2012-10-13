/* Module Dependencies */
var logger = require("winston"),
    _ = require("underscore"),
    azure = require("azure"),
    uuid = require("node-uuid"),
    request = require("request");

/* 
 * @author Jaime Bueza
 * 
 * Provides an implementation for operations on entities
 */
Model = function Constructor(definition, account) {
  if (!definition) {
    throw new Error("Invalid model constructor definition");
  }
  if (!account) {
    throw new Error("Invalid account information upon model instantiation");
  }

  this.definition = definition;
  this._account = account;
  this._tableName = definition._tableName;
  this._tableService = azure.createTableService(account.AZURE_STORAGE_ACCOUNT, account.AZURE_STORAGE_ACCESS_KEY);

  return this;
};

/* 
 * Saves an entity
 *
 * @param callback {Function} 
 */
Model.prototype.save = function SaveEntity(callback) {
  var me = this.definition;
  if (!me.PartitionKey) {
    me.PartitionKey = uuid.v4();
  }
  if (!me.RowKey) {
    me.RowKey = uuid.v4();
  }
  var self = this;
  var data = _.omit(me, "_tableName");

  logger.info("Inserting or merging entity");

  self._tableService.createTableIfNotExists(self._tableName, function(tableError) {
    if (tableError) {
      logger.error(tableError);
      callback.call(self, tableError);
    } else {
      // Table exists or created
      logger.info("Creating table");
      self._tableService.insertOrMergeEntity(self._tableName, data, function(err, entity, response) {
        if (err) logger.error("Unable to save entity");
        logger.info("Successfully saved entity");
        callback.call(self, err, entity, response);
      });
    }
  });
};

/* 
 * Retrieves child entities based on a row key and partition key
 *
 */
Model.prototype.children = function RetrieveaAllChildren() {};

/* 
 * Removes an entity
 *
 * @param err {Object} 
 * @param callback {Function} 
 */
Model.prototype.remove = function RemoveEntity(err, callback) {

};

module.exports = Model;
