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
      let sql = `INSERT INTO address VALUES(0,'${newAddress[0]}','${newAddress[1]}','${newAddress[2]}','${newAddress[3]}',${newAddress[4]}); UPDATE useraddress SET address=(SELECT addressID FROM address WHERE line1='${newAddress[0]}' && line2='${newAddress[1]}' && zip=${newAddress[4]} LIMIT 1) WHERE user = ${userid} && addressType='shipping';`;

      connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
      })
      
    }

    static async setBilling(newAddress, userid) {
      console.log('setting billing');
      let sql = `INSERT INTO address VALUES(0,'${newAddress[0]}','${newAddress[1]}','${newAddress[2]}','${newAddress[3]}',${newAddress[4]}); UPDATE useraddress SET address=(SELECT addressID FROM address WHERE line1='${newAddress[0]}' && line2='${newAddress[1]}' && zip=${newAddress[4]} LIMIT 1) WHERE user = ${userid} && addressType='billing';`;

      connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
      })
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
  
  // Address.getLine1(1)
  // Address.getLine2(1)
  // Address.getCity(1)
  // Address.getState(1)
  // Address.getZip(1)
  // Address.setShipping(["1234 Another St","Apt 1","Test City","Testesse",54321],1)
  // Address.setBilling(["1234 Another St","Apt 1","Test City","Testesse",54321],1)


  module.exports = Address;
  