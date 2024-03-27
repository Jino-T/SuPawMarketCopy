// myApi.js - My API route module

const express = require("express");
const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

var bodyParser = require("body-parser");
const User = require("../models/User");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

router.get("/", function(req, res) {
  res.render("pages/home"); // This will render views/pages/home.ejs
});

// Dog Products page route
router.get("/dogSubProducts", function(req, res) {
  res.render("pages/dogSubProducts"); // This will render views/pages/dogSubProducts.ejs
});

// Product page rroute
router.get("/dogProducts", function(req, res) {
  res.render("pages/dogProducts"); // This will render views/pages/products.ejs
});

//login page route
router.get("/login", function(req, res) {
  res.render("pages/login"); // This will render views/pages/login.ejs
});

router.post("/validate", urlencodedParser, async function(req, res) {
  //console.log(req);
  let check = await UserController.validate(req.body);
  console.log(check);
  if (check === true) {
    res.render("pages/home");
  } else {
    res.send("Wrong username or password");
  }
});

router.post("/create", urlencodedParser, async function(req, res) {
  //console.log(req);
  let check = await UserController.createUser(req.body);
  console.log(check);
  if (check === true) {
    res.render("pages/home");
  } else {
    res.send("Username already in use");
  }
});

// Get product quantity
router.get("/product/quantity/:productId", ProductController.getQuantity);

// Get product name
router.get("/product/name/:productId", ProductController.getProductName);

router.get("/product/image/:productId", ProductController.getImage);

// Get product description
router.get("/product/description/:productId", ProductController.getDescription);

// Get product price
router.get("/product/price/:productId", ProductController.getPrice);

// Get cat 
router.get("/user/category/:categoryName", UserController.productsByCat);

module.exports = router;
