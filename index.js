const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
var db;

app.set('view engine', 'ejs')

MongoClient.connect('mongodb://adidafhe10:eRad60165@node-list-app-shard-00-00-kk3sc.mongodb.net:27017,node-list-app-shard-00-01-kk3sc.mongodb.net:27017,node-list-app-shard-00-02-kk3sc.mongodb.net:27017/node-list-app?ssl=true&replicaSet=node-list-app-shard-0&authSource=admin', (err, database) => {
  if(err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
})

// Middleware that changes the request or response object before they get handled by the app.
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  db.collection('todos').find().toArray((err, result) => {
    if(err) return console.log(err)

    res.render('index.ejs', {todos: result})
  })
})

app.post('/todos', (req, res) => {
  db.collection('todos').save(req.body, (err, result) => {
    if(err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
