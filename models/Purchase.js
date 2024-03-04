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
      // TODO
    }

    // May want to also have a method to return the product object (instance of class) as opposed to the product id
    static async getProductID(purchaseId) {
      console.log('getting product id for purchase: ' + purchaseId.toString());
      // TODO
    }

    static async getQuantity(purchaseId) {
        console.log('getting quantity for purchase: ' + purchaseId.toString());
        let sql = `SELECT quantity FROM product WHERE productID = ${purchaseId}`
        
        let res = await connection.promise().query(sql);
        return res;  
    }

    static async getPurchaseTime(purchaseId) {
        console.log('getting purchase time for purchase: ' + purchaseId.toString());
        let sql = `SELECT purchaseTime FROM product WHERE productID = ${purchaseId}`
        
        let res = await connection.promise().query(sql);
        return res;  
    }

    static async setUserID(purchaseId, newUserID) {
      console.log('setting user id for purchase: ' + purchaseId.toString());
      if(Number.isInteger(newUserID)) {
        this.userID = newUserID;

        //TODO
        //Add sql statement

      } else {
      throw 'The userID has to be an integer';
      }
    }

    static async setProductID(purchaseId, newUProductID) {
      console.log('setting product id for purchase: ' + purchaseId.toString());
      if(Number.isInteger(newUserID)) {
        this.userID = newUserID;

        //TODO
        //Add sql statement

      } else {
      throw 'The userID has to be an integer';
      }
    }

    static async setQuantity(purchaseId, newQuantity) {
      console.log('setting quantity for purchase: ' + purchaseId.toString());
      if(Number.isInteger(newUserID)) {
        this.userID = newUserID;

        //TODO
        //Add sql statement

      } else {
      throw 'The userID has to be an integer';
      }
    }

    static async setPurchaseTme(purchaseId, newPurchaseTime) {
      console.log('setting purchase time for purchase: ' + purchaseId.toString());
      this.purchaseTime = newPurchaseTime;

        //TODO
        //Add sql statement

    }
  }
  
  module.exports = Purchase;
  