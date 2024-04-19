const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Purchase = require("../models/Purchase");
//const router = require('../routes/myApi');

var connection = require('../database').databaseConnection;


class PurchaseController {

    // adds a purchase to the database; purchaseID is auto incremented
    // Example call: PurchaseController.addPurchase(401, 120, 5, '2022-03-30 09:49:30');
    static async addPurchase(userID, productID, quantity, purchaseTime) {
        try {
            const result = await Purchase.addPurchase(userID, productID, quantity, purchaseTime);
            return result;
        } catch (error) {
            console.log("Caught error");
            console.error("Error adding purchase", error);
        }
    }    

    // Get userID from a purchase
    static async getUserID(purchaseID) {
        try {
            let res = await Purchase.getUserID(purchaseID);
            return res;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get productID from a purchase
    static async getProductID(purchaseID) {
        try {
            let res = await Purchase.getProductID(purchaseID);
            return res;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get quantity from a purchase
    static async getQuantity(purchaseID) {
        try {
            let res = await Purchase.getQuantity(purchaseID);
            return res;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get purchasetime from a purchase
    static async getPurchaseTime(purchaseID) {
        try {
            let res = await Purchase.getPurchaseTime(purchaseID);
            return res;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

//PurchaseController.addPurchase(401, 120, 5, '2022-03-30 09:49:30');
//PurchaseController.getUserID(709);
//PurchaseController.getProductID(709);
//PurchaseController.getQuantity(709);
//PurchaseController.getPurchaseTime(709);

module.exports = PurchaseController;