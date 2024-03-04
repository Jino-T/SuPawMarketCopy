// models/Review.js

class Review {
    constructor(reviewID, userID, starRating, body) {
      this.reviewID = reviewID;         // int
      this.userID = userID; // int
      this.productID = productID; // int
      this.starRating = starRating; // float
      this.body = body;     // string
    }

    static async getUserID(reviewId) {
      console.log('getting user id for review: ' + reviewID.toString());
      // TODO
    }
    
    static async getProductID() {
      console.log('getting user id for review: ' + reviewID.toString());
      // TODO
    }

    static async getStarRating(reviewId) {
        console.log('getting star rating for review: ' + reviewId.toString());
        let sql = `SELECT starRating FROM product WHERE productID = ${reviewId}`
        
        let res = await connection.promise().query(sql);
        return res;  
    }

    static async getBody(reviewId) {
        let sql = `SELECT body FROM product WHERE productID = ${reviewId}`
        
        let res = await connection.promise().query(sql);
        return res;  
    }
    
    static async setUserId(reviewId, newuserId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.userID = newuserId;

        //TODO
        //Add sql statement

    }

    static async setProductId(reviewId, newproductId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.productId = newproductId;

        //TODO
        //Add sql statement

    }

    static async setStarRating(reviewId, newStarRating) {
      console.log('setting star rating for review: ' + reviewId.toString());
      this.starRating = newStarRating;

        //TODO
        //Add sql statement

    }

    static async setBody(reviewId, newBody) {
      console.log('setting body for review: ' + reviewId.toString());
      this.body = newBody;

        //TODO
        //Add sql statement

    }
  }
  
  module.exports = Review;
  