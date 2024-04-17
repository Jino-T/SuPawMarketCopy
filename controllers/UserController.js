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

    static async addToCart(userID, info) {
        try {
            const productID = info.productID;
            const quantity = info.quantity;

            const result = await User.addToCart(productID, userID, quantity);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            
        }
    }
    
    static async getCart(req, res) {
        try {
            const userID = req.params.userID;
            const cartItems = await User.getCart(userID);
            res.json(cartItems);
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    
    static async removeFromCart(userID, productID) {
        try {
            const result = await User.removeFromCart(userID, productID);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    } 
}




    // async function testGetID(){User.getUserID('jburns').then(res => console.log(res))};
    // testGetID();

module.exports = UserController;
