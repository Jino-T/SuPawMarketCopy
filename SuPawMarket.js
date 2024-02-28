const express = require('express');
const app = express();
const port = 3000;
var connection = require('./database').databaseConnection;

// Require the module you just created
const myApi = require('./routes/myApi');

// Use the module with your Express application at the root path
app.use('/', myApi); // Change this line to mount at the root path

// Set the view engine to ejs if you are rendering views
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
