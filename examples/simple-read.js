var account = require("../test/fixtures/credentials.json");

var ModelProvider = require("../lib/node-azure-tables");


var  api = new ModelProvider(account);

var Users = api.model("Users");

Users.findOne()