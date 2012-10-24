var account = require("../test/fixtures/secret.json");
var Client = require("../lib/Client");
var uuid = require("node-uuid");


var dre = new Client(account);

var Person = dre.model("People", dre.Schema({
  FirstName: "string",
  LastName: "string"
}));

var partition = uuid.v4();


var data = [{
  PartitionKey: partition,
  RowKey: uuid.v4(),
  FirstName: "John",
  LastName: "Smith"
}, {
  PartitionKey: partition,
  RowKey: uuid.v4(),
  FirstName: "Cathy",
  LastName: "Samuelson"
}, {
  PartitionKey: partition,
  RowKey: uuid.v4(),
  FirstName: "Jim",
  LastName: "Moores"
}];

// insert fake data
var imported = 0;
data.forEach(function(item, index, arr) {
  var person = new Person();
  person.save(item, function(err, saved) {
    imported++;
    if (imported == arr.length) {
      onComplete();
    }
  });
});

function onComplete() {  
  console.log("Finished insertion.");
  PersonModel = new Person();

  PersonModel.find(null, function(err, entities) {
    console.log("Found Entities: " + entities.length);
  });
}

