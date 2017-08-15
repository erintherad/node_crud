const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/todos', (req, res) => {
  console.log('hello');
})

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
