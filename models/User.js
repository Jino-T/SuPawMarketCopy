// model/UserModel.js
const Address = require('./Address');
const bcrypt = require("bcrypt")
var connection = require('../database').databaseConnection;

class User {
    constructor(username, id, password, email, shippingInfo) {
      this.username = username;
      this.id = id;
      this.password = password;
      this.email = email;
      this.shippingInfo = shippingInfo;
      this.cart = [];
    }
  
    static async createUser(username, password) {
      let sqlMatches = `SELECT * FROM user WHERE username='${username}'`;
      const matches = await connection.promise().query(sqlMatches);
      //console.log(matches[0]);
      if(matches[0].length === 0) {
        bcrypt.hash(password, 10, function(err, hash) {
          connection.query(`INSERT INTO user VALUES(0,'${username}','${hash}', 0)`);
          console.log("User created")
        })
        return true;
      }
      else{
        console.log("User creation failed - username already in use");
        return false;
      }
    }

    static async validateUser(username, password) {
      let sqlMatches = `SELECT password FROM user WHERE username='${username}'`;
      const matches = await connection.promise().query(sqlMatches);
      //console.log(JSON.stringify(matches[0]).slice(14,JSON.stringify(matches[0]).length-3));
      return bcrypt.compareSync(password, JSON.stringify(matches[0]).slice(14,JSON.stringify(matches[0]).length-3),function(err, result) {
        if(err) throw err;
      })
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

  // async function foo(){User.createUser("bhorn1","iron").then(res => console.log(res))};
  // foo();
// async function bar(){User.validateUser("notexistant","pass").then(res => console.log(res))};
//   bar();
  
  module.exports = User;
  