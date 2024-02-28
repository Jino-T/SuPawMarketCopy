// model/UserModel.js
const Address = require('./Address');

class User {
    constructor(username, id, password, email, shippingInfo) {
      this.username = username;
      this.id = id;
      this.password = password;
      this.email = email;
      this.shippingInfo = shippingInfo;
      this.cart = [];
    }
  
    static async getUsername(username) {
      this.username = username;
      return true;
    }

    static async setUsername(username) {
      this.username = username;
      return true;
    }
  
    static async setPassword(password) {
      this.password = password;
      return true;
    }
  
    static async addToCart(productId) {
      // Logic to add a product to the cart
      return true;
    }
  
    static async removeFromCart(productId) {
      // Logic to remove a product from the cart
      return true;
    }
  
    static async getCart() {
      return this.cart;
    }
  
    static async checkout() {
      // Logic to checkout
      return true;
    }
  
    static async getOrderHistory() {
      // Logic to get order history
    }
  
    static async searchProduct(keyword) {
      // Logic to search for products
    }
  
    static async getProducts() {
      // Logic to get products
    }
  
  }
  
  export default User;
  