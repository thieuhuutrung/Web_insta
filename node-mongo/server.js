var mongoOperation = require('./mongoOperation'),
    mongoClient  = require('mongodb').MongoClient,
    assert = require('assert');

//connection URL
var url = 'mongodb://localhost:27017/testMongo';

mongoClient.connect(url,function (err,db) {
  assert.equal(err,null);
  console.log('Connecte to MongoDb server');

  mongoOperation.insertDocument(db,'dishes',{name:'abc',description:'XYZ'},function (result) {
    console.log(result.ops);
    mongoOperation.findDocuments(db,'dishes',function (docs) {
      console.log(docs);
      mongoOperation.updateDocument(db,'dishes',{name:'abc'},{description:'New XYZ'},function (result) {
        console.log(result.result);
        mongoOperation.findDocuments(db,'dishes',function (docs) {
          console.log(docs);
          mongoOperation.removeDocument(db,'dishes',{name:'abc'},function (result) {
            console.log(result.result);
            db.dropCollection('dishes',function(result){
              console.log(result);
              db.close();
            });
          })
        })        
      })
    });
  });
});
