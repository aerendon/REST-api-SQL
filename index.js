const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('Responding to root route');
  res.send('Hello from ROOT');
});

app.get('/users', (req, res) => {
  const user1 = [
    { firstName: "Stephen", lastName: "Curry" },
    { firstName: "Stephen", lastName: "Curry" } 
  ];
  res.status(200).json(user1);
});

app.listen(3000, () => {
  console.log("Server is up and listening on 3000");
});