/* Module Dependencies */

var logger = require("winston"),
    EventEmitter = require('events').EventEmitter,
    _ = require("underscore"),
    azure = require("azure"),
    uuid = require("node-uuid"),
    request = require("request");



/* 
 * @author Jaime Bueza
 * 
 * Provides an implementation for operations on entities
 * 
 * @param definition {Object}
 * @param account {Object}
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
Model.prototype.__proto__ = EventEmitter.prototype;

/* 
 * Retrieves an entity
 *
 * @param callback {Function} 
 */
Model.prototype.findOne = function(query, callback) {

  var self = this;

  if (!query.PartitionKey) throw new Error("Invalid paritition key");
  if (!query.RowKey) throw new Error("Invalid row key");

  logger.info("Retrieving an entity");
  self._tableService.queryEntity(self._tableName, query.PartitionKey, query.RowKey, function(err, entity, response) {
    if (err) logger.error("Unable to retrieve entity");
    logger.info("Successfully returned entity");
    callback.call(self, err, entity, response);
  });
};

/* 
 * Retrieves a list of entities
 *
 * @param query {Object}
 * @param callback {Function} 
 */
Model.prototype.find = function(query, callback) {
  if (arguments.length != 2) throw new Error("Invalid arguments");
  if (typeof callback != 'function') throw new Error("Invalid callback");

  var self = this;

  if (!query) {
    query = azure.TableQuery.select().from(self._tableName);
  }

  logger.info("Retrieving a list of entities");

  self._tableService.queryEntities(query, function(err, entities) {
    if (err) logger.error("Unable to retrieve entities");
    logger.info("Successfully returned entities");
    callback.call(self, err, entities);
  });
};

/* 
 * Saves an entity
 *
 * @param callback {Function} 
 */
Model.prototype.save = function SaveEntity(params, callback) {
  if (!params) throw new Error("Invalid parameters being saved");
  if (!callback || !typeof callback == 'function') throw new Error("Invalid callback");

  if (!params.PartitionKey) params.PartitionKey = uuid.v4();
  if (!params.RowKey) params.RowKey = uuid.v4();

  var self = this;

  var data = _.omit(params, "_tableName");

  logger.info("Inserting or merging entity");

  self._tableService.createTableIfNotExists(self._tableName, function(tableError) {
    if (tableError) {
      logger.error(tableError);
      callback.call(self, tableError);
    } else {
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



Model.prototype.before = function(event, callback) {
  this.on(event, callback);
};

Model.prototype.after = function(event, callback) {
  this.on(event, callback);
};

module.exports = Model;
