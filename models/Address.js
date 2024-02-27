// models/Address.js

class Address {
    constructor(line1, line2, city, state, zip) {
      this.line1 = line1;
      this.line2 = line2;
      this.city = city;
      this.state = state;
      this.zip = zip;
    }
  
    static async setShipping(address) {
      // Implementation here
    }
  
    static async getLine1() {
      // Implementation here
    }
  
    static async getLine2() {
      // Implementation here
    }
  
    static async getCity() {
      // Implementation here
    }
  
    static async getState() {
      // Implementation here
    }
  
    static async getZip() {
      // Implementation here
    }
  }
  
  module.exports = Address;
  