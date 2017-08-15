const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware that changes the request or response object before they get handled by the app.
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/todos', (req, res) => {
  console.log('hello');
})

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
