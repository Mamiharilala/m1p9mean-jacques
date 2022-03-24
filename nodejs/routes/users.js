var express = require('express');
var router = express.Router();

/* GET users listing. */
//mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/star-wars";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars')
    const quotesCollection = db.collection('quotes')
    // ========================
    // Middlewares
    // ========================
    // ========================
    // Routes
    // ========================
    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });
 
  })
  .catch(console.error)


module.exports = router;
