// models/Purchase.js
var connection = require('../database').databaseConnection;

class Purchase {
    constructor(purchaseID, userID, productID, quantity, purchaseTime) {
      this.purchaseID = purchaseID; // int
      this.userID = userID; // int
      this.productID = productID; // int
      this.quantity = quantity; // int
      this.purchaseTime = purchaseTime; // DATETIME in sql
    }
  
    //adds purchase to the database; Example function call: Purchase.addPurchase(702, 401, 120, 5, '2022-03-30 09:49:30')
    static async addPurchase(purchaseID, userID, productID, quantity, purchaseTime) {
      console.log("Adding a purchase to the database");

      let sql = `INSERT INTO \`supawdb\`.\`purchase\` (\`purchaseID\`, \`user\`, \`product\`, \`quantity\`, \`purchaseTime\`) VALUES ('?', '?', '?', '?', ?);`
      await connection.promise().query(sql, [purchaseID, userID, productID, quantity, purchaseTime]);
      console.log("Purchase Added");
    }

    // returns user id associated to the purchase id; Example call: Purchase.getUserID(701);
    static async getUserID(purchaseId) {
      console.log('getting user id for purchase: ' + purchaseId.toString());

      let sql = `SELECT user FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        console.log(result[0].user);
        return result[0].user;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    // returns product id associated to the purchase id; Example call: Purchase.getProductID(701);
    static async getProductID(purchaseId) {
      console.log('getting product id for purchase: ' + purchaseId.toString());

      let sql = `SELECT product FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        console.log(result[0].product);
        return result[0].product;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    // returns quantity associated with the purchase id; Example call: Purchase.getQuantity(701);
    static async getQuantity(purchaseId) {
      console.log('getting quantity for purchase: ' + purchaseId.toString());

      let sql = `SELECT quantity FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        console.log(result[0].quantity);
        return result[0].quantity;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    // returns quantity associated with the purchase id; Example call: Purchase.getPurchaseTime(701);
    static async getPurchaseTime(purchaseId) {
      console.log('getting purchase time for purchase: ' + purchaseId.toString());
        
      let sql = `SELECT purchaseTime FROM purchase WHERE purchaseID = ?;`;
      const [result] = await connection.promise().query(sql, [purchaseId]);
      if (result.length > 0) {
        console.log(result[0].purchaseTime);
        return result[0].purchaseTime;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    //Updates user id associated with purchaseId; Example call: Purchase.setUserID(701, 402);
    static async setUserID(purchaseId, newUserID) {
      console.log('setting user id for purchase: ' + purchaseId.toString());
        this.userID = newUserID;

      let sql = `UPDATE purchase SET user = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newUserID, purchaseId]);
      console.log("Purchase User Id updated");
    }

    //Updates product id associated with purchaseId; Example call: Purchase.setProductID(701, 120);
    static async setProductID(purchaseId, newProductID) {
      console.log('setting product id for purchase: ' + purchaseId.toString());
        this.productID = newProductID;

      let sql = `UPDATE purchase SET product = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newProductID, purchaseId]);
      console.log("Purchase Product Id updated");
    }

    //Updates quantity associated with purchaseId; Example call: Purchase.setQuantity(701, 50);
    static async setQuantity(purchaseId, newQuantity) {
      console.log('setting quantity for purchase: ' + purchaseId.toString());
        this.quantity = newQuantity;

      let sql = `UPDATE purchase SET quantity = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newQuantity, purchaseId]);
      console.log("Purchase quantity updated");
    }

    //Updates purchase time associated with purchase id; put newPurchaseTime in single quotes; Example call: Purchase.setPurchaseTime(701, '2020-03-30 09:49:30');
    static async setPurchaseTime(purchaseId, newPurchaseTime) {
      console.log('setting purchase time for purchase: ' + purchaseId.toString());
      this.purchaseTime = newPurchaseTime;

      let sql = `UPDATE purchase SET purchaseTime = ? WHERE purchaseID = ?;`;
      await connection.promise().query(sql, [newPurchaseTime, purchaseId]);
      console.log("Purchase's Purchase Time updated");
    }
  }
  
  //Test data
  //Run: node ./models/Purchase.js
    //Purchase.addPurchase(702, 401, 120, 5, '2022-03-30 09:49:30')
    //Purchase.getUserID(701);
    //Purchase.getProductID(701);
    //Purchase.getQuantity(701);
    //Purchase.getPurchaseTime(701);

    //Purchase.setUserID(701, 402);
    //Purchase.setProductID(701, 120);
    //Purchase.setQuantity(701, 50);
    //Purchase.setPurchaseTime(701, '2020-03-30 09:49:30');

  module.exports = Purchase;
  