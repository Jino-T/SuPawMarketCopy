// models/Admin.js
var connection = require('../database').databaseConnection;

class Admin {
    constructor(username, id, password, email) {
      this.username = username;
      this.id = id;
      this.password = password;
      this.email = email;
    }
  
    static async addItem(productName, price, inventory, description, categories, imgPath='') { //adds product to DB including what categories its in
      //assumes categories is an array of strings of already existing product categories
      let prodInsSQL = `INSERT INTO product VALUES(0, '${productName}','${price}','${inventory}','${description}','${imgPath}')`;
      //let catInsSQL = `INSERT INTO incategory VALUES(0, (SELECT categoryID FROM category WHERE categoryName))`

      connection.promise().query(prodInsSQL).then(() => { //after product is inserted, assign it categories in db
        for(let i of categories){ //for loop necessary if its in multiple cats
          connection.query(`INSERT INTO incategory VALUES(0, (SELECT categoryID FROM category WHERE categoryName='${i}'), (SELECT productID FROM product WHERE productName='${productName}'))`)
        }
      })

      console.log("product added");
    }
  
    static async removeItem(productID) { //removes product from DB
      let sql = `DELETE FROM product WHERE productID=${productID};`;
      connection.query(sql);
      console.log("product removed");
    }
  
    static async setPrice(productID, newPrice) {
      // TODO
    }
  
    static async setProductName(productID, newName) {
      // TODO
    }
  
    static async setDescription(productID, newDescription) {
      // TODO
    }
  
    static async hideReview() {
      // TODO
    }
  
    static async showReview() {
      // TODO
    }
  }

  // Admin.addItem("soemthing or other",12.45,50,"A really cool product description",["testCat"]);
  Admin.removeItem(1);
  
  module.exports = Admin;
  