// models/Order.js

class Order {
    constructor(orderID, orderDate, products) {
      this.orderID = orderID; // int
      this.orderDate = orderDate; // Date object or date string
      this.products = products; // Array of Product instances
    }
  
    static async operation1(params) {
      // TODO
    }
  
    static async operation2(params) {
      // TODO
    }
  
    static async operation3() {
      // TODO
    }
  }
  
  module.exports = Order;
  