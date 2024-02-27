// models/Admin.js

class Admin {
    constructor(username, id, password, email) {
      this.username = username;
      this.id = id;
      this.password = password;
      this.email = email;
    }
  
    static async addItem(strings) {
      // TODO
    }
  
    static async removeItem(id) {
      // TODO
    }
  
    static async setPrice(id, price) {
      // TODO
    }
  
    static async setProductName(id, name) {
      // TODO
    }
  
    static async setDescription(id, description) {
      // TODO
    }
  
    static async hideReview() {
      // TODO
    }
  
    static async showReview() {
      // TODO
    }
  }
  
  module.exports = Admin;
  