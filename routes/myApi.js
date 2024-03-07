// myApi.js - My API route module

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("pages/home"); // This will render views/pages/home.ejs
  });

  // About page route
  //router.get("/about", function (req, res) {
  //  res.render("pages/about"); // This will render views/pages/about.ejs
 // });
 
 // Product page rroute
 router.get("/products", function (req, res) {
  res.render("pages/products"); // This will render views/pages/products.ejs
});

//login page route
router.get("/login", function (req, res) {
  res.render("pages/login"); // This will render views/pages/login.ejs
});

  
  

module.exports = router;
