var account = require("../test/fixtures/secret.json");
var Client = require("../lib/Client");

var client = new Client(account);

var person = client.define("People", {
  PartitionKey: "dcb83fa0-15c4-463f-99b7-2ce365878b20",
  RowKey: "58f92ada-2aa9-48f8-9429-4580e0f91b81",
  FirstName: "Jaime",
  LastName: "Bueza",
  FavoriteAnimal: "Cat",
  DateJoined: new Date()
});

person.save(function(err, entity, response) {

  // w00t
});
