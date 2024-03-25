// myApi.js - My API route module

const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router.get("/", function (req, res) {
    const sessionData = req.session;
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

router.get("/create", function (req, res) {
  res.render("pages/createaccount"); // This will render views/pages/login.ejs
});

router.post("/validate",urlencodedParser, async function(req, res) {
  //console.log(req);
    let check = await UserController.validate(req.body);
    //let userID = await UserController.getUserID(req.session.username);
    //console.log(check);
    if(check === true) {
      req.session.isLoggedIn = true;
      req.session.username = req.username;
      //req.session.userID = userID;
      res.render("pages/home");
    }
    else {
      res.send("Wrong username or password");
    }
  
})

router.post("/create",urlencodedParser, async function(req, res) {
  //console.log(req);
    let check = await UserController.createUser(req.body);
    console.log(check);
    if(check === true) {
      res.render("pages/home");
    }
    else {
      res.send("Username already in use");
    }
  
})


module.exports = router;
