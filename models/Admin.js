// models/Admin.js
var connection = require('../database').databaseConnection;

class Admin {
    constructor(username, id, password, email) {
      this.username = username;
      this.id = id;
      this.password = password;
      this.email = email;
    }

//METHODS RELATING TO PRODUCTS
    static async addItem(productName, price, inventory, description, categories, imgPath='') { //adds product to DB including what categories its in
      //assumes categories is an array of strings of already existing product categories
      let prodInsSQL = `INSERT INTO product VALUES(0, '${productName}','${price}','${inventory}','${description}','${imgPath}')`;

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
  
    static async setProductName(productID, newName) {
      let sql = `UPDATE product SET productName="${newName}" WHERE productID=${productID};`;
      connection.query(sql);
      console.log("product updated"); 
    }

    static async setPrice(productID, newPrice) {
      let sql = `UPDATE product SET price='${newPrice}' WHERE productID=${productID};`;
      connection.query(sql);
      console.log("product updated");
    }

    static async setInventory(productID, newInventory){
      let sql = `UPDATE product SET inventory='${newInventory}' WHERE productID=${productID};`;
      connection.query(sql);
      console.log("product updated");
    }
  
    static async setDescription(productID, newDescription) { //sets description in database - inclusion of " in the description will cause an error
      let sql = `UPDATE product SET description="${newDescription}" WHERE productID=${productID};`;
      console.log(longDesc);
      connection.query(sql, (err, res) => {
        if(err) throw err;
        console.log(res);
      });
      //console.log("product updated");
    }

    static async setCategories(productID, newCategories) {//change an items categories in the db, assumes newCategories is an array of strings
      let delSQL = `DELETE FROM incategory WHERE prodID=${productID};`; //removes an items old categories and adds the new ones to the DB
      connection.promise().query(delSQL).then(() => {
        for(let i of newCategories){ //for loop necessary if there are multiple newCategories
          connection.query(`INSERT INTO incategory VALUES(0, (SELECT categoryID FROM category WHERE categoryName='${i}'), (SELECT productID FROM product WHERE productID='${productID}'))`)
        }
      })
    }
  
//METHODS RELATING TO REVIEWS
    static async hideReview() {
      // TODO
    }
  
    static async showReview() {
      // TODO
    }
  }

  // Admin.addItem("bother",111.23,99,"A unique product description",["testCat","secCat"]);
  // Admin.removeItem(1);
  // Admin.setProductName(2, "Iams Cat Food");
  // Admin.setPrice(2, 5.99);
  // Admin.setInventory(2, 1);
  // let longDesc = `W"ow this is a super long and detailed description that is totally not meant to test the length that a description can be in the databse - how long is it? I don't know I didn't keep count.`
  // Admin.setDescription(2, longDesc);
  // Admin.setCategories(2, ["secCat"]);
  
  module.exports = Admin;
  