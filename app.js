const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jwD~%+bQmasAU~Yr',
  database: 'subscriptions'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

const server = http.createServer((req, res) => {
  let filePath = '.' + url.parse(req.url).pathname;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
  }

  const query = url.parse(req.url, true).query;

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      if (stats.isDirectory()) {
        filePath += '/index.html';
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          let updatedContent = content.toString();

          // Modify the content to include query parameter values
          for (const key in query) {
            updatedContent = updatedContent.replace('{{' + key + '}}', query[key]);
          }

          res.end(updatedContent, 'utf-8');
        }
      });
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
