var assert = require("assert");

module.exports = {
  insertDocument: function (db, collection, document, callback) {
    //get collection ogject
    var col = db.collection(collection);

    //insert documents
    col.insert(document, function (err, result) {
      assert.equal(err, null);
      console.log(`Inserted document ${result.result.n} into collection ${collection}`);
      callback(result);
    });
  },
  findDocuments: function (db, collection, callback) {
    //get collection object
    var col = db.collection(collection);

    //get documents
    col.find({}).toArray(function (err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
  },
  removeDocument: function (db, collection, document, callback) {
    //get collection object
    var col = db.collection(collection);

    col.deleteOne(document, function (err, result) {
      assert.equal(err, null);
      console.log(`Deleted a document ${document}`);
      callback(result);
    });
  },
  updateDocument: function (db, collection, docToUpd, newDoc, callback) {
    //get collection object
    var col = db.collection(collection);

    col.updateOne(docToUpd, { $set: newDoc }, null, function (err, result) {
      assert.equal(err, null);
      console.log("Updated the document with " + newDoc);
      callback(result);
    });
  }
}