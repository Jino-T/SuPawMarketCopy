// myApi.js - My API route module

const express = require("express");
const router = express.Router();


router.get("/", function (req, res) {
    res.render("pages/home"); // This will render views/pages/home.ejs
  });
  
  // About page route
  router.get("/about", function (req, res) {
    res.render("pages/about"); // This will render views/pages/about.ejs
  });
  
  

module.exports = router;
