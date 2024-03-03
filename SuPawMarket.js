const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set the view engine to ejs if you are rendering views
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')))

// Require the module you just created
const myApi = require('./routes/myApi');

// Use the module with your Express application at the root path
app.use('/', myApi); // Mount at the root path

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
