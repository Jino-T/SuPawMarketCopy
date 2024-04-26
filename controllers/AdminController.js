const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Admin = require("../models/Admin");
const router = require('../routes/myApi');
const User = require('../models/User');

class AdminController {

    //PRODUCT METHODS
    static async addProduct(info, imgName='') {
        // console.log("cotoller user: " + info.username);
        // console.log("controller pass: " + info.password);
        // console.log(info.productName);
        // console.log(info.categories);
        // console.log(info.categories);
        // let categories = info.categories.split(",");
        await Admin.addItem(info.productName,info.price,info.inventory,info.productDesc,info.categories, "product-images/" + imgName);
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
        console.log(info.category);
        await Admin.setProductName(info.productID, info.productName);
        await Admin.setPrice(info.productID, info.price);
        await Admin.setInventory(info.productID, info.inventory);
        await Admin.setDescription(info.productID, info.description);
        await Admin.setCategories(info.productID,info.category);
        return true;
    }

    static async updateProductImg(info, imgName) {
        await Admin.setImgPath(info.productID,"product-images/" + imgName);
        return true;
    }

    static async deleteProduct(info) {
        await Admin.removeItem(info.productID);
        return true;
    }

    //PRODUCT AUDIT METHODS

    static async recordAdd(userID, info) {
        await Admin.recordAdd(userID, info.productName);
    }

    static async recordEdit(userID, info) {
        //console.log("in recordEdit controller");
        await Admin.recordEdit(userID, info.productID, info.productName);
    }

    static async recordRemove(userID, info) {
        await Admin.recordRemove(userID,info.productID,info.productName);
    }

    static async getProductHistory(info) {
        //console.log(info);
        let res = await Admin.getProductHistory(info.prodID);
        //console.log(res);
        return res;
    }

    //USER METHODS
    static async getUsers() {
        let res = await Admin.getUsers();
        return res;
    }

    static async toggleAdmin(info) {
        let res = await Admin.toggleAdmin(info.userID, info.currentStatus);
        return res;
    }

}

module.exports = AdminController;