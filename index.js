const express = require('express');
// Middleware that changes the request or response object before they get handled by the app.
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
var db;

// Allows app to use ejs files
app.set('view engine', 'ejs');
// Allows app to use external js files
app.use(express.static('public'));
// Allows app to read JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://adidafhe10:eRad60165@node-list-app-shard-00-00-kk3sc.mongodb.net:27017,node-list-app-shard-00-01-kk3sc.mongodb.net:27017,node-list-app-shard-00-02-kk3sc.mongodb.net:27017/node-list-app?ssl=true&replicaSet=node-list-app-shard-0&authSource=admin', (err, database) => {
  if(err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
})

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

app.put('/todos', (req, res) => {
  db.collection('todos')
  .findOneAndUpdate({todo: 'another test'}, {
    $set: {
      todo: req.body.todo,
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })

  app.delete('/todos', (req, res) => {
    db.collection('todos').findOneAndDelete({todo: req.body.todo},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'A todo got deleted'})
    })
  })
})
