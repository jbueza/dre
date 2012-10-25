# NodeJS and Windows Azure Table Storage

A NodeJS library for a fast, easy way of accessing Windows Azure Table Storage. This library is inspired by [MongooseJS](http://www.mongoosejs.com).

[![Build Status](https://secure.travis-ci.org/AgileBusinessCloud/dre.png)](http://travis-ci.org/AgileBusinessCloud/dre)
  
## Getting Started

```
npm install dre
```

### Boilerplate
```javascript 
var Client = require("../lib/Client");

var dre = new Client({
  "AZURE_STORAGE_ACCOUNT": "example_account", 
  "AZURE_STORAGE_ACCESS_KEY": "example_key"
});

var Person = dre.model("People", dre.Schema({
  FirstName: "string",
  LastName: "string",
  FavoriteAnimal: "string"
}));
```

### Using DevStorage (Windows)
```javascript 
var Client = require("../lib/Client")
  , ServiceClient = azure.ServiceClient;

var dre = new Client({
  "AZURE_STORAGE_ACCOUNT": ServiceClient.DEVSTORE_STORAGE_ACCOUNT, 
  "AZURE_STORAGE_ACCESS_KEY": ServiceClient.DEVSTORE_STORAGE_ACCESS_KEY 
});

var Person = dre.model("People", dre.Schema({
  FirstName: "string",
  LastName: "string",
  FavoriteAnimal: "string"
}));
```

### Inserting entities

```javascript
var person = new Person();

person.save({
  PartitionKey: "dcb83fa0-15c4-463f-99b7-2ce365878b20",
  RowKey: "58f92ada-2aa9-48f8-9429-4580e0f91b81",
  FirstName: "Jaime",
  LastName: "Bueza"
}, function(err, entity) {
  console.log("Saved you! ", entity);
});
```

### Retrieving an entity

```javascript
person.findOne({
  PartitionKey: "dcb83fa0-15c4-463f-99b7-2ce365878b20",
  RowKey: "58f92ada-2aa9-48f8-9429-4580e0f91b81"
}, function(err, entity) {
  console.log("Found you! ", entity);
});
```

### Retrieving a set of entities

#### Simple with no query (retrieves all entities in a table)

```javascript
new Person().find(null, function(err, entities) {
  console.log("Found Entities: " + entities.length);
});
```

#### Passing a Query for specific entities

```javascript
new Person().find({ FirstName: "Jaime" }, function(err, entities) {
  console.log("Found Entities: " + entities.length);
});
```

### Removing an entity

```javascript
new Person().remove({
  PartitionKey: "dcb83fa0-15c4-463f-99b7-2ce365878b20",
  RowKey: "58f92ada-2aa9-48f8-9429-4580e0f91b81"
}, function(err, entity) {
  console.log("Removed you! ", entity);
});
```

## Roadmap

* Round 1
  * Retrieving, saving, updating, removing entities 
* Round 2
  * Schemas, validation, batching
* Round 3

## Running the tests

```
npm test
```

## Additional Resources

If you're unfamiliar with the Windows Azure Table Storage (Partition Keys and Row Keys), [feel free to dive into the documentation](http://msdn.microsoft.com/en-us/library/windowsazure/dd179338.aspx).

## License 

(The MIT License)

Copyright (c) 2012 Jaime Bueza &lt;jbueza@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.