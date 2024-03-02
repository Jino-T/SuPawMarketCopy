// models/Address.js
var connection = require('../database').databaseConnection;

class Address {
    constructor(line1, line2, city, state, zip) {
      this.line1 = line1;
      this.line2 = line2;
      this.city = city;
      this.state = state;
      this.zip = zip;
    }
  
    static async setShipping(newAddress, userid) {
      console.log('setting shipping');
      let existCheck = `SELECT EXISTS(SELECT * FROM address WHERE addressID = (SELECT id FROM useraddress WHERE id=${userid} && addressType='shipping'));`;
      let addShipping = `INSERT INTO address VALUES(0,${newAddress[0]},${newAddress[1]},${newAddress[2]},${newAddress[3]},${newAddress[4]}); 
        INSERT INTO useraddress VALUES(0,${userid},SELECT addressID FROM address WHERE ${newAddress[0]} = line1 && ${newAddress[1]} = line2,'shipping')`;
      //let updateShipping = `UPDATE `

      connection.query(existCheck, (err, result) => {
        if(err) throw err;
        console.log(result.changedRows)
        if(result[0] === false){
          console.log('result was false')
          connection.query(addshipping,(err,result) => {
            if(err) throw err;
            console.log(result)
          })
        }
        if(result[0] === true){
          console.log('result was tru')
        }
      })
      
    }

    static async setBilling(newAddress, userid) {
      // Implementation here
    }
  
    static async getLine1(userid) {
      let sql = `SELECT line1 FROM address WHERE addressID = (SELECT id FROM useraddress WHERE id=${userid});`;

      connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
      })
    }
  
    static async getLine2(userid) {
      let sql = `SELECT line2 FROM address WHERE addressID = (SELECT id FROM useraddress WHERE id=${userid});`;

      connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
      })
    }
  
    static async getCity(userid) {
      let sql = `SELECT city FROM address WHERE addressID = (SELECT id FROM useraddress WHERE id=${userid});`;

      connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
      })
    }
  
    static async getState(userid) {
      let sql = `SELECT state FROM address WHERE addressID = (SELECT id FROM useraddress WHERE id=${userid});`;

      connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
      })
    }
  
    static async getZip(userid) {
      let sql = `SELECT zip FROM address WHERE addressID = (SELECT id FROM useraddress WHERE id=${userid});`;

      connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
      })
    }
  }
  
  let addy = Address.getLine1(1)
  // Address.getLine2(1)
  // Address.getCity(1)
  // Address.getState(1)
  // Address.getZip(1)
  //Address.setShipping(['1234 Street St','','Test City','Testesse',54321],2)


  module.exports = Address;
  