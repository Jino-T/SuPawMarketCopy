const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Admin = require("../models/Admin");
const router = require('../routes/myApi');

class AdminController {

    static async addProduct(info) {
        // console.log("cotoller user: " + info.username);
        // console.log("controller pass: " + info.password);
        // console.log(info.productName);
        // console.log(info.categories);
        let categories = info.categories.split(",");
        Admin.addItem(info.productName,info.price,info.inventory,info.productDesc,categories);
        //console.log(check)
    }

}

module.exports = AdminController;