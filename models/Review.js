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
        return result[0].inventory;
      } else {
        console.log("Review not found");
        return null;
      }
    }
    
    static async setUserId(reviewId, newuserId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.userID = newuserId;

      let sql = `UPDATE review SET userID = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newuserId, reviewId]);
      console.log("Review User Id updated");
    }

    static async setProductId(reviewId, newproductId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.productId = newproductId;

      let sql = `UPDATE review SET productID = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newproductId, reviewId]);
      console.log("Review Product Id updated");
    }

    static async setStarRating(reviewId, newStarRating) {
      console.log('setting star rating for review: ' + reviewId.toString());

      if (newStarRating > 5 || newStarRating < 0) {
        console.log('Error: Star Rating must be between 0 to 5');
      } else {

      this.starRating = newStarRating;

      let sql = `UPDATE review SET starRating = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newStarRating, reviewId]);
      console.log("Review Star Rating updated");
      }
    }

    static async setReviewText(reviewId, newReviewText) {
      console.log('setting Review text for review: ' + reviewId.toString());
      this.reviewText = newReviewText;

      let sql = `UPDATE review SET reviewText = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newReviewText, reviewId]);
      console.log("Review's Review Text updated");
    }
  }


  
  module.exports = Review;
  