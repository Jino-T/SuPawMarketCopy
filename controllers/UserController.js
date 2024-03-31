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
        //console.log(check)
        return check;
    }

    static async createUser(info) {
        // console.log("cotoller user: " + info.username);
        // console.log("controller pass: " + info.password);
        let check = User.createUser(info.username,info.password);
        //console.log(check)
        return check;
    }

    static async getUserID(username) {
        let res = User.getUserID(username);
        return res;
    }

    static async checkIsAdmin(username) {
        let res = await User.checkIsAdmin(username);
        //console.log(res.substring(12,13));
        return parseInt(res.substring(12,13));
    }
}

    // async function testGetID(){User.getUserID('jburns').then(res => console.log(res))};
    // testGetID();

module.exports = UserController;