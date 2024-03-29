// models/Purchase.js

class Purchase {
    constructor(purchaseID, userID, productID, quantity, purchaseTime) {
      this.purchaseID = purchaseID; // int
      this.userID = userID; // int
      this.productID = productID; // int
      this.quantity = quantity; // int
      this.purchaseTime = purchaseTime; // DATETIME in sql
    }
  
    // May want to also have a method to return the user object (instance of class) as opposed to the user id
    static async getUserID(purchaseId) {
      console.log('getting user id for purchase: ' + purchaseId.toString());

      let sql = `SELECT userID FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    // May want to also have a method to return the product object (instance of class) as opposed to the product id
    static async getProductID(purchaseId) {
      console.log('getting product id for purchase: ' + purchaseId.toString());

      let sql = `SELECT productID FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    static async getQuantity(purchaseId) {
      console.log('getting quantity for purchase: ' + purchaseId.toString());

      let sql = `SELECT quantity FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    static async getPurchaseTime(purchaseId) {
      console.log('getting purchase time for purchase: ' + purchaseId.toString());
        
      let sql = `SELECT purchaseTime FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    static async setUserID(purchaseId, newUserID) {
      console.log('setting user id for purchase: ' + purchaseId.toString());
        this.userID = newUserID;

      let sql = `UPDATE purchase SET userID = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newUserID, purchaseId]);
      console.log("Purchase User Id updated");
    }

    static async setProductID(purchaseId, newProductID) {
      console.log('setting product id for purchase: ' + purchaseId.toString());
        this.userID = newUserID;

      let sql = `UPDATE purchase SET productID = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newProductID, purchaseId]);
      console.log("Purchase Product Id updated");
    }

    static async setQuantity(purchaseId, newQuantity) {
      console.log('setting quantity for purchase: ' + purchaseId.toString());
        this.userID = newUserID;

      let sql = `UPDATE purchase SET quantity = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newQuantity, purchaseId]);
      console.log("Purchase quantity updated");
    }

    static async setPurchaseTime(purchaseId, newPurchaseTime) {
      console.log('setting purchase time for purchase: ' + purchaseId.toString());
      this.purchaseTime = newPurchaseTime;

      let sql = `UPDATE purchase SET purchaseTime = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newPurchaseTime, purchaseId]);
      console.log("Purchase's Purchase Time updated");
    }
  }
  
  Review.setPurchaseTime(6);

  module.exports = Purchase;
  