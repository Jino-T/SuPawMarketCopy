var connection = require('../database').databaseConnection;

class Review {
    constructor(reviewID, userID, starRating, reviewText) {
      this.reviewID = reviewID;         // int
      this.userID = userID; // int
      this.productID = productID; // int
      this.starRating = starRating; // float
      this.reviewText = reviewText;     // string
    }

    static async getUserID(reviewId) {
      console.log('getting user id for review: ' + reviewId.toString());

      let sql = `SELECT userID FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }
    
    static async getProductID(reviewId) {
      console.log('getting product id for review: ' + reviewId.toString());

      let sql = `SELECT productID FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    static async getStarRating(reviewId) {
      console.log('getting star rating for review: ' + reviewId.toString());

      let sql = `SELECT starRating FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    static async getReviewText(reviewId) {
      console.log('getting review Text for review: ' + reviewId.toString());

      let sql = `SELECT reviewText FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        let tmp = result[0].inventory;
        console.log(JSON.stringify(tmp));
        return JSON.stringify(tmp);
      } else {
        console.log("Review not found");
        return null;
      }
    }
    
    //New user id must be an int and for proper functionality must be an existing user id in the database
    static async setUserId(reviewId, newuserId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.userID = newuserId;

      let sql = `UPDATE review SET userID = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newuserId, reviewId]);
      console.log("Review User Id updated");
    }

    //New product id must be an int and for proper functionality must be an existing product id in the database
    static async setProductId(reviewId, newproductId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.productId = newproductId;

      let sql = `UPDATE review SET productID = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newproductId, reviewId]);
      console.log("Review Product Id updated");
    }

    //Star rating must be an int (no decimal ex: 0,1,2,3,4,5); rating cannot be less than 0 or greater than 5;
    static async setStarRating(reviewId, newStarRating) {
      console.log('setting star rating for review: ' + reviewId.toString());

      if (newStarRating > 5 || newStarRating < 0) {
        console.log('Error: Star Rating must be between 0 to 5');
      } else {

      this.starRating = newStarRating;

      let sql = `UPDATE review SET rating = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newStarRating, reviewId]);
      console.log("Review Star Rating updated");
      }
    }

    //Review text must be a string; can be an empty string
    static async setReviewText(reviewId, newReviewText) {
      console.log('setting Review text for review: ' + reviewId.toString());
      this.reviewText = newReviewText;

      let sql = `UPDATE review SET reviewText = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newReviewText, reviewId]);
      console.log("Review's Review Text updated");
    }
  }

Review.setUserId(801, 402);
//Review.setReviewText(6, "John");
//console.log(Review.getReviewText(6));

//node review.js
  
  module.exports = Review;
  