const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const User = require("../models/User");
const router = require('../routes/myApi');


class UserController {
    static async validate(info) {
        // console.log("cotoller user: " + info.username);
        // console.log("controller pass: " + info.password);
        let check = User.validateUser(info.username,info.password);
        console.log(check)
        return check;
    }

    static async createUser(info) {
        // console.log("cotoller user: " + info.username);
        // console.log("controller pass: " + info.password);
        let check = User.createUser(info.username,info.password);
        console.log(check)
        return check;
    }

    static async productsByCat(info) {
        let check = User.productsByCat(info);
        console.log(check)
        return check;
    }    
}

module.exports = UserController;