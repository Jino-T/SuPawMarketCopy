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

    static async setShipping(newAddress, userid) {  //inserts new address and updates the shipping userAddress in DB to reflect that
      //console.log('setting shipping');
      let sql = `INSERT INTO address VALUES(0,'${newAddress[0]}','${newAddress[1]}','${newAddress[2]}','${newAddress[3]}',${newAddress[4]}); UPDATE userAddress SET address=(SELECT addressID FROM address WHERE line1='${newAddress[0]}' && line2='${newAddress[1]}' && zip=${newAddress[4]} LIMIT 1) WHERE user = ${userid} && addressType='shipping';`;
      //assumes newAddress is given as an array in format - [line1, line2, city, state, zip]
        //can pretty easily be changed to accept each part as a different parameter if that's easier with the frontend form

      connection.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result)
      })
      
    }

    static async setBilling(newAddress, userid) { //inserts new address and updates the billing userAddress in DB to reflect that
      console.log('setting billing');
      let sql = `INSERT INTO address VALUES(0,'${newAddress[0]}','${newAddress[1]}','${newAddress[2]}','${newAddress[3]}',${newAddress[4]}); UPDATE userAddress SET address=(SELECT addressID FROM address WHERE line1='${newAddress[0]}' && line2='${newAddress[1]}' && zip=${newAddress[4]} LIMIT 1) WHERE user = ${userid} && addressType='billing';`;
      //assumes newAddress is given as an array in format - [line1, line2, city, state, zip] - won't work otherwise
        //can pretty easily be changed to accept each part as a different parameter if that's easier with the frontend form
      connection.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result)
      })
    }
  
    static async getShippingLine1(userid) {
      let sql = `SELECT line1 FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='shipping');`;
      
      let res = await connection.promise().query(sql);

      let tmp = res[0] //RETURNS A LIBRARY THAT WE INDEX INTO IN THE CONTROLLER TO DISPLAY DATA
      console.log(tmp); //FOr troubleshooting
      return tmp;
    }
  
    static async getShippingLine2(userid) {
      let sql = `SELECT line2 FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='shipping');`;

      let res = await connection.promise().query(sql);

      let tmp = res[0] //RETURNS A LIBRARY THAT WE INDEX INTO IN THE CONTROLLER TO DISPLAY DATA
      console.log(tmp);
      return tmp;
    }
  
    static async getShippingCity(userid) {
      let sql = `SELECT city FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='shipping');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0] //RETURNS A LIBRARY THAT WE INDEX INTO IN THE CONTROLLER TO DISPLAY DATA
      console.log(tmp);
      return tmp;
    }
  
    static async getShippingState(userid) {
      let sql = `SELECT state FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='shipping');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0] //RETURNS A LIBRARY THAT WE INDEX INTO IN THE CONTROLLER TO DISPLAY DATA
      console.log(tmp);
      return tmp;
    }
  
    static async getShippingZip(userid) {
      let sql = `SELECT zip FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='shipping');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0]; //RETURNS A LIBRARY THAT WE INDEX INTO IN THE CONTROLLER TO DISPLAY DATA
      console.log(tmp);
      return tmp;
    }

    static async getBillingLine1(userid) {
      let sql = `SELECT line1 FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='billing');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0]
      console.log(tmp);
      return tmp;
    }
  
    static async getBillingLine2(userid) {
      let sql = `SELECT line2 FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='billing');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0]
      console.log(tmp);
      return tmp;
    }
  
    static async getBillingCity(userid) {
      let sql = `SELECT city FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='billing');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0]
      console.log(tmp);
      return tmp;
    }
  
    static async getBillingState(userid) {
      let sql = `SELECT state FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='billing');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0]
      console.log(tmp);
      return tmp;
    }
  
    static async getBillingZip(userid) {
      let sql = `SELECT zip FROM address WHERE addressID = (SELECT address FROM userAddress WHERE user=${userid} && addressType='billing');`;

      let res = await connection.promise().query(sql);
      let tmp = res[0]
      console.log(tmp);
      return tmp;
    }

  }
  
  // Address.setShipping(["1234 Another St","Apt 1","Test City","Testesse",54321],1);
  // Address.setBilling(["4321 Parker Ave","","Trinity","Testylvania",98765],1);
  // Address.getShippingLine1(401);
  // Address.getShippingLine2(401);
  // Address.getShippingCity(401);
  // Address.getShippingState(401);
  // Address.getShippingZip(401);
  // Address.getBillingLine1(1);
  // Address.getBillingLine2(1);
  // Address.getBillingCity(1);
  // Address.getBillingState(1);
  // Address.getBillingZip(1);
  // async function checkgetShip1() {Address.getShippingLine1(1).then(res => console.log(res))};
  // checkgetShip1();
  // async function checkgetShip2() {Address.getShippingLine2(1).then(res => console.log(res))};
  // checkgetShip2();


  module.exports = Address;
  