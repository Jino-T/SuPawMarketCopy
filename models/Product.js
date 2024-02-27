// models/Product.js

const db = require('../database'); //This needs to be setup 

class Product {
  constructor(productId, name, description, quantity, price, category) {
    this.productId = productId; // int
    this.name = name; // string
    this.description = description; // string
    this.quantity = quantity; // int
    this.price = price; // int
    this.category = category; // array of strings
  }

  static async getQuantity(productId) {
    // TODO
  }

  static async setQuantity(productId, newQuantity) {
    // TODO
  }

  static async setPrice(productId, newPrice) {
    // TODO
  }

  static async setProductName(productId, newName) {
    // TODO
  }

  static async setDescription(productId, newDescription) {
    // TODO
  }

  static async getImage(productId) {
    // TODO
  }
}

module.exports = Product;
