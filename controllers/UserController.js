const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const User = require("../models/User");
const router = require("../routes/myApi");

class UserController {
  static async validate(info) {
    // console.log("cotoller user: " + info.username);
    // console.log("controller pass: " + info.password);
    let check = User.validateUser(info.username, info.password);
    console.log(check);
    return check;
  }

  static async createUser(info) {
    // console.log("cotoller user: " + info.username);
    // console.log("controller pass: " + info.password);
    let check = User.createUser(info.username, info.password);
    console.log(check);
    return check;
  }

  static async productsByCat(req, res) {
    try {
      // Takes in category name from the request parameter
      const category = req.params.categoryName;
      const products = await User.getProductsByCategory(category);

      // No need to stringify here, res.json() will do it for you
      res.json(products);
      
    } catch (error) {
      console.error("Error in productsByCat:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = UserController;
