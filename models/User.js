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
    
//ACCOUNT INFORMATION METHODS
    static async createUser(username, password) {
      let sqlMatches = `SELECT * FROM user WHERE username='${username}'`;
      const matches = await connection.promise().query(sqlMatches);
      //console.log(matches[0]);
      if(matches[0].length === 0) {       //if username does not yet exist -> create user
        bcrypt.hash(password, 10, function(err, hash) {
          connection.promise().query(`INSERT INTO user VALUES(0,'${username}','${hash}', 0)`).then(() => { //after user is inserted, set userAddress to a default address, so  it can be updated by the setAddress function in the address model
            connection.query(`INSERT INTO userAddress VALUES(0,(SELECT userID FROM user WHERE username='${username}'), 1,'shipping')`);
            connection.query(`INSERT INTO userAddress VALUES(0,(SELECT userID FROM user WHERE username='${username}'), 1,'billing')`);
          });
          console.log("User created");
        })
        return true;
      }
      else{ //if matches returns something, then the username already exists and user creation fails
        console.log("User creation failed - username already in use");
        return false;
      }
    }

    static async validateUser(username, password) {
      let sqlMatches = `SELECT password FROM user WHERE username='${username}'`;
      const matches = await connection.promise().query(sqlMatches);
      //console.log(JSON.stringify(matches[0]).slice(14,JSON.stringify(matches[0]).length-3));
      return bcrypt.compareSync(password, JSON.stringify(matches[0]).slice(14,JSON.stringify(matches[0]).length-3),function(err, result) {
        if(err) throw err;                //^string parsing necessary because matches returns a string of an array, not just the PW
      })
    }

    static async setUsername(oldUsername, newUsername) { //allows users to set a new username 
      let sql = `UPDATE user SET username='${newUsername}' WHERE username='${oldUsername}';`;
      connection.query(sql, (err, res) => {
        if(err) throw err;                        //setting newUsername to a username that already exists throws an error
        console.log("Username updated")
      });
    }
  
    static async setPassword(username, oldPassword,newPassword) { //allows users to set a new password
      let check = await this.validateUser(username,oldPassword)   //confirm user info before allowing them to change PW
      if(check) { //if user info is accurate update pw in db with new hashed pw       
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

    static async getUserID(username) {
      let sql = `SELECT userID FROM user WHERE username='${username}';`;
      let res = await connection.promise().query(sql);
      //console.log(JSON.stringify(res[0]).split(':')[1]);
      let result = JSON.stringify(res[0]).split(':')[1].split('}')[0];
      return parseInt(result);
    }
  
//PURCHASING METHODS
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
  
//SEARCH AND GET METHODS
    static async searchProduct(keyword) {
      // Logic to search for products
    }
  
    static async getProducts() { //returns a string of the list of all productsIDs in the database
      let sql = `SELECT productID FROM product;`

      let res = await connection.promise().query(sql);
      return JSON.stringify(res[0]);
    }

    //might need to implement other getProduct methods (like by category) or sorting -- check with rest of group
  
  }

  // async function testCreate(){User.createUser("testaddy","addy").then(res => console.log(res))};
  // testCreate();
  // async function testVal(){User.validateUser("notexistant","pass").then(res => console.log(res))};
  // testVal();
  // User.setUsername("bhorn1","bhorn");
  // async function testSetUser(){User.setUsername("bhorn","bhorn1").then}
  // User.setPassword("jburns","password","pass");
  // async function testVal(){User.validateUser("jburns","pass").then(res => console.log(res))};
  // testVal();
  // async function testgetProd(){User.getProducts().then(res => console.log(res))};
  // testgetProd();
  async function testGetID(){User.getUserID('jburns').then(res => console.log(res))};
  testGetID();
  
  module.exports = User;
  