const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');

const app = express();

app.use(morgan('combined'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

app.get('/', (req, res) => {
  console.log('Responding to root route');
  res.send('Hello from ROOT');
});

app.get('/users', (req, res) => {
  connection.query("SELECT * FROM user", (err, rows, fields) => {
    console.log('I think we fetched users');
    res.status(200).json(rows);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const queryString = "SELECT * FROM user WHERE user_id = ?";

  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users');
      res.end();
      return;
    }
    console.log('I think we fetched users');
    res.status(200).json(rows);
  });

  // res.end();
});

app.listen(3000, () => {
  console.log("Server is up and listening on 3000");
});