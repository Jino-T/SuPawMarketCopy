const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Admin = require("../models/Admin");
const router = require('../routes/myApi');
const User = require('../models/User');

class AdminController {

    static async addProduct(info, imgName) {
        // console.log("cotoller user: " + info.username);
        // console.log("controller pass: " + info.password);
        // console.log(info.productName);
        // console.log(info.categories);
        // console.log(info.categories);
        // let categories = info.categories.split(",");
        Admin.addItem(info.productName,info.price,info.inventory,info.productDesc,info.categories, "product-images/" + imgName);
        //console.log(check)
    }

    static async getProdInfo() {
        let res = await User.getProductInfo();
        return res;
    }

    static async getCategoryInfo() {
        let res = await User.getCategories();
        return res;
    }

    static async updateProduct(info) {
        Admin.setProductName(info.productID, info.productName);
        Admin.setPrice(info.productID, info.price);
        Admin.setInventory(info.productID, info.inventory);
        Admin.setDescription(info.productID, info.description);
        Admin.setCategories(info.productID,info.category);
        return true;
    }

    static async deleteProduct(info) {
        Admin.removeItem(info.productID);
        return true;
    }

    static async getUsers() {
        let res = await Admin.getUsers();
        return res;
    }

}

module.exports = AdminController;