var connection = require('../database').databaseConnection;

class Product {
  constructor(productId, productName, description, inventory, price, imagePath) {
    this.productId = productId; // int
    this.productName = productName; // string
    this.description = description; // string
    this.inventory = inventory; // int
    this.price = price; // decimal
    this.imagePath = imagePath; // string
  }

  static async getQuantity(productId) {
    let sql = `SELECT inventory FROM product WHERE productID = ?;`;
    const [result] = await connection.promise().query(sql, [productId]);
    if (result.length > 0) {
      return result[0].inventory;
    } else {
      console.log("Product not found");
      return null;
    }
  }

  static async getImage(productId) {
    let sql = `SELECT imagePath FROM product WHERE productID = ?;`;
    const [result] = await connection.promise().query(sql, [productId]);
    if (result.length > 0) {
      return result[0].imagePath;
    } else {
      console.log("Product not found");
      return null;
    }
  }

  // Method to get productName
  static async getProductName(productId) {
    let sql = `SELECT productName FROM product WHERE productID = ?;`;
    const [result] = await connection.promise().query(sql, [productId]);
    if (result.length > 0) {
      return result[0].productName;
    } else {
      console.log("Product not found");
      return null;
    }
  }

  // Method to get description
  static async getDescription(productId) {
    let sql = `SELECT description FROM product WHERE productID = ?;`;
    const [result] = await connection.promise().query(sql, [productId]);
    if (result.length > 0) {
      return result[0].description;
    } else {
      console.log("Product not found");
      return null;
    }
  }

  // Method to get price
  static async getPrice(productId) {
    let sql = `SELECT price FROM product WHERE productID = ?;`;
    const [result] = await connection.promise().query(sql, [productId]);
    if (result.length > 0) {
      return result[0].price;
    } else {
      console.log("Product not found");
      return null;
    }
  }


  static async setQuantity(productId, newInventory) {
    let sql = `UPDATE product SET inventory = ? WHERE productID = ?;`;
    await connection.promise().query(sql, [newInventory, productId]);
    console.log("Product quantity updated");
  }

  static async setPrice(productId, newPrice) {
    let sql = `UPDATE product SET price = ? WHERE productID = ?;`;
    await connection.promise().query(sql, [newPrice, productId]);
    console.log("Product price updated");
  }

  static async setProductName(productId, newProductName) {
    let sql = `UPDATE product SET productName = ? WHERE productID = ?;`;
    await connection.promise().query(sql, [newProductName, productId]);
    console.log("Product name updated");
  }

  static async setDescription(productId, newDescription) {
    let sql = `UPDATE product SET description = ? WHERE productID = ?;`;
    await connection.promise().query(sql, [newDescription, productId]);
    console.log("Product description updated");
  }


}

module.exports = Product;
