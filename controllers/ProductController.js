const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Product = require("../models/Product");
const router = require('../routes/myApi');

class ProductController {
    // Get quantity of a product
    static async getQuantity(req, res) {
        try {
            const productId = req.params.productId;
            const quantity = await Product.getQuantity(productId);
            if(quantity !== null) {
                res.status(200).json({ quantity });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getProductName(req, res) {
        try {
            const productId = req.params.productId;
            const productName = await Product.getProductName(productId);
            if(productName !== null) {
                res.status(200).json({ productName });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get product description
    static async getDescription(req, res) {
        try {
            const productId = req.params.productId;
            const description = await Product.getDescription(productId);
            if(description !== null) {
                res.status(200).json({ description });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get product price
    static async getPrice(req, res) {
        try {
            const productId = req.params.productId;
            const price = await Product.getPrice(productId);
            if(price !== null) {
                res.status(200).json({ price });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get product image path
    static async getImage(req, res) {
        try {
            const productId = req.params.productId;
            const imagePath = await Product.getImage(productId);
            if(imagePath !== null) {
                res.status(200).json({ imagePath });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }    

    // Update quantity of a product
    static async setQuantity(req, res) {
        try {
            const productId = req.params.productId;
            const { newQuantity } = req.body;
            await Product.setQuantity(productId, newQuantity);
            res.status(200).json({ message: "Product quantity updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Update price of a product
    static async setPrice(req, res) {
        try {
            const productId = req.params.productId;
            const { newPrice } = req.body;
            await Product.setPrice(productId, newPrice);
            res.status(200).json({ message: "Product price updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Additional methods for setProductName, setDescription, etc., can be added here following the same pattern
}

module.exports = ProductController;
