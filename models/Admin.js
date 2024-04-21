// models/Admin.js
var connection = require('../database').databaseConnection;

class Admin {
    constructor(username, id, password, email) {
      this.username = username;
      this.id = id;
      this.password = password;
      this.email = email;
    }

//PRODUCT METHODS
    static async addItem(productName, price, inventory, description, categories, imgPath='') { //adds product to DB including what categories its in
      //assumes categories is an array of strings of already existing product categories
      let prodInsSQL = `INSERT INTO product VALUES(0, '${productName}','${price}','${inventory}','${description}','${imgPath}')`;

      connection.promise().query(prodInsSQL).then(() => { //after product is inserted, assign it categories in db
        //console.log(categories);
        if(typeof(categories) === "string") {//if admin only selects one category it passes a string instead of an array
          let category = categories;
          categories = [category];
        }

        for(let i of categories){ //for loop necessary if its in multiple cats
          connection.query(`INSERT INTO incategory VALUES(0, (SELECT categoryID FROM category WHERE categoryName='${i}'), (SELECT productID FROM product WHERE productName='${productName}'))`)
        }
      })
      
      console.log("product added");
    }
  
    static async removeItem(productID) { //removes product from DB
      let sql = `DELETE FROM product WHERE productID=${productID};`;
      await connection.promise().query(sql);
      console.log("product removed");
    }
  
    static async setProductName(productID, newName) {
      console.log(productID);
      let sql = `UPDATE product SET productName="${newName}" WHERE productID=${productID};`;
      await connection.promise().query(sql);
      console.log("product updated"); 
    }

    static async setPrice(productID, newPrice) {
      let sql = `UPDATE product SET price='${newPrice}' WHERE productID=${productID};`;
      await connection.promise().query(sql);
      console.log("product updated");
    }

    static async setInventory(productID, newInventory){
      //console.log(productID);
      let sql = `UPDATE product SET inventory='${newInventory}' WHERE productID=${productID};`;
      await connection.promise().query(sql);
      console.log("product updated");
    }
  
    static async setDescription(productID, newDescription) { //sets description in database - inclusion of " in the description will cause an error
      let sql = `UPDATE product SET description="${newDescription}" WHERE productID=${productID};`;
      //console.log(longDesc);
      connection.query(sql, (err, res) => {
        if(err) throw err;
        //console.log(res);
      });
      //console.log("product updated");
    } 

    static async setImgPath(productID, newImgPath) {
      let sql = `UPDATE product SET imagePath="${newImgPath}" WHERE productID=${productID};`;
      connection.query(sql,(err,res) => {
        if(err) throw err;
      });
    }

    static async setCategories(productID, newCategories) {//change an items categories in the db, assumes newCategories is an array of strings
      let delSQL = `DELETE FROM incategory WHERE productID=${productID};`; //removes an items old categories and adds the new ones to the DB
      connection.promise().query(delSQL).then(() => {
        for(let i of newCategories){ //for loop necessary if there are multiple newCategories
          connection.query(`INSERT INTO incategory VALUES(0, (SELECT categoryID FROM category WHERE categoryName='${i}'), (SELECT productID FROM product WHERE productID='${productID}'))`)
        }
      })
      console.log("Category updated");
    }
  
    //PRODUCT AUDIT METHODS
    static async recordAdd(userID, productName) {
      let sql = `INSERT INTO edits VALUES(0, ${userID}, (SELECT MAX(productID) FROM product), 'Add', NOW(), '${productName}');`;
      let res = await connection.promise().query(sql);
      return res[0];
    }

    static async recordEdit(userID, productID, productName) {
      //console.log("in recordEdit model")
      let sql = `INSERT INTO edits VALUES(0, ${userID}, ${productID}, "Edit", NOW(),  '${productName}');`;
      let res = await connection.promise().query(sql);
      return res[0];
    }

    static async recordRemove(userID, productID, productName) {
      let sql = `INSERT INTO edits VALUES(0, ${userID}, null, "Remove", NOW(), '${productName}');`;
      let res = await connection.promise().query(sql);
      return res[0];
    }

    static async getProductHistory(productID) {
      let sql = `SELECT edits.userID, edits.editType, edits.editTime, edits.productName, user.username FROM edits INNER JOIN user ON user.userID = edits.userID AND edits.prodID = ${productID};`;
      let res = await connection.promise().query(sql);
      return res[0];

    }

    //USER METHODS
    static async getUsers() {
      let sql = `SELECT * FROM user;`
      let res = await connection.promise().query(sql);
      return res[0];
    }

    static async toggleAdmin(userID, currentStatus) {
      let sql = `UPDATE user SET isAdmin=${!currentStatus} WHERE userID=${userID};`;
      let res = await connection.promise().query(sql);
      return res[0];
    }

//REVIEW METHODS
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
  // Admin.toggleAdmin(4,true);
  
  module.exports = Admin;
  