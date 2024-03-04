// models/Product.js
var connection = require('../database').databaseConnection;
//const db = require('../database'); //This needs to be setup 

class Product {
  constructor(productId, name, description, inventory, price, imagePath) {
    this.productId = productId; // int
    this.name = name; // string
    this.description = description; // string
    this.inventory = inventory; // int
    this.price = price; // int
    this.imagePath = imagePath;

    // Not currently in the database
    //this.category = category; // array of strings
  }

  static async getName(productId) {
      console.log('getting name for product: ' + productId.toString());
      let sql = `SELECT productName FROM product WHERE productID = ${productId}`
      
      let res = await connection.promise().query(sql);
      return res;  
  }

  static async getPrice(productId) {
      console.log('getting price for product: ' + productId.toString());
      let sql = `SELECT price FROM product WHERE productID = ${productId}`
      
      let res = await connection.promise().query(sql);
      return res;  
  }

  static async getInventory(productId) {
      console.log('getting inventory for product: ' + productId.toString());
      let sql = `SELECT inventory FROM product WHERE productID = ${productId}`
      
      let res = await connection.promise().query(sql);
      return res;  
  }

  static async getDescription(productId) {
      console.log('getting description for product: ' + productId.toString());
      let sql = `SELECT description FROM product WHERE productID = ${productId}`
      
      let res = await connection.promise().query(sql);
      return res;  
  }

  static async getImagePath(productId) {
      console.log('getting imagepath for product: ' + productId.toString());
      let sql = `SELECT imagePath FROM product WHERE productID = ${productId}`
      
      let res = await connection.promise().query(sql);
      return res;  
  }

  static async setInventory(productId, newinventory) {
    console.log('setting quanitity for product: ' + productId.toString());
    if(Number.isInteger(newinventory)) {
      this.inventory = newinventory;

      // Add sql statement

    } else {
      throw 'The inventory has to be an integer';
    }
  }

  static async setPrice(productId, newPrice) {
    console.log('setting price for product: ' + productId.toString());
    //This should round down the price to only have 2 decimal points
    this.price = newPrice.toFixed(2);

    //TODO
    //Add sql statement
  }

  static async setProductName(productId, newName) {
    console.log('setting product name for product: ' + productId.toString());
    this.name = newName;

    //TODO
    //Add sql statement
  }

  static async setDescription(productId, newDescription) {
    console.log('setting decription for product: ' + productId.toString());
    this.description = newDescription;

    //TODO
    //Add sql statement
  }

  static async setImagePath(productId, newImagePath) {
    console.log('setting image path for product: ' + productId.toString());
    this.imagePath = newImagePath;

    //TODO
    //Add sql statement
  }
}

// "Tests"
//Product.getInventory(1);

module.exports = Product;
