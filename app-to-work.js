const express = require('express');
const app = express();
const port = 3000; // You can change the port number to the one you prefer
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',     // Replace with your MySQL host
    user: 'root',     // Replace with your MySQL username
    password: 'jwD~%+bQmasAU~Yr', // Replace with your MySQL password
    database: 'codestructure', // Replace with your MySQL database name
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
    return;
  }
  console.log('Connected to the database');
});

// Define routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/manageResources', (req, res) => {
  res.sendFile(__dirname + '/manageResources/index.html');
});

app.get('/manageResources/listResources', (req, res) => {
  const query = 'SELECT * FROM subscriptions';
  const params = [];

  runQuery(query, params, (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.render('listResources', { results });
  });
});

app.get('/authorization', (req, res) => {
  res.sendFile(__dirname + '/authorization/index.html');
});