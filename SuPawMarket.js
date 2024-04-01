const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
var connection = require('./database').databaseConnection;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set the view engine to ejs if you are rendering views
app.set("view engine", "ejs");

// Added views and public folder
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "product-images")));
// Require the module you just created
const myApi = require("./routes/myApi");

// Use the module with your Express application at the root path
app.use("/", myApi); // Mount at the root path

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
