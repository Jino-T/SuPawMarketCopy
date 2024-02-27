// models/Review.js

class Review {
    constructor(id, starRating, body, userID) {
      this.id = id;         // int
      this.starRating = starRating; // float
      this.body = body;     // string
      this.userID = userID; // int
    }
      
    // Update the star rating of the review
    static async updateRating(newRating) {
      // TODO
    }
  
    // Update the body text of the review
    static async updateBody(newBody) {
      // TODO
    }
    
    // Associate the review with a user
    static async linkToUser(userID) {
      // TODO
    }
  }
  
  module.exports = Review;
  