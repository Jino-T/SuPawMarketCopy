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
    
    // static async getUsername(username) {
    //   this.username = username;
    //   return true;
    // }

    static async setUsername(oldUsername, newUsername) {  //setting newUsername to a username that already exists throws an error
      let sql = `UPDATE user SET username='${newUsername}' WHERE username='${oldUsername}';`;
      connection.query(sql, (err, res) => {
        if(err) throw err;
        console.log("Username updated")
      });
    }
  
    static async setPassword(username, oldPassword,newPassword) {
      let check = await this.validateUser(username,oldPassword)
      if(check) {
        bcrypt.hash(newPassword, 10, function(err, hash) {
          if(err) throw err;
          connection.query(`UPDATE user SET password='${hash}' WHERE username='${username}';`);
          console.log("Password Updated")
        })
      }
      else {
        console.log("Improper username or password")
      }
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

  // async function testCreate(){User.createUser("bhorn1","iron").then(res => console.log(res))};
  // testCreate();
  // async function testVal(){User.validateUser("notexistant","pass").then(res => console.log(res))};
  // testVal();
  // User.setUsername("bhorn1","bhorn");
  // async function testSetUser(){User.setUsername("bhorn","bhorn1").then}
  // User.setPassword("jburns","password","pass");
  // async function testVal(){User.validateUser("jburns","pass").then(res => console.log(res))};
  // testVal();
  
  module.exports = User;
  