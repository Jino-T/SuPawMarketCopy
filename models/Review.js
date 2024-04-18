var connection = require('../database').databaseConnection;

class Review {
    constructor(reviewID, userID, productID, starRating, reviewText) {
      this.reviewID = reviewID;         // int
      this.userID = userID; // int
      this.productID = productID; // int
      this.starRating = starRating; // float
      this.reviewText = reviewText;     // string
    }

    //addes review in the database; Example function call: Review.addReview(802, 403, 102, `wow`, 2);
    static async addReview(reviewID, userID, productID, reviewText, rating) {
      console.log("Adding a review to the database");

      let sql = `INSERT INTO \`supawdb\`.\`review\` (\`reviewID\`, \`userID\`, \`productID\`, \`reviewText\`, \`rating\`) VALUES ('?', '?', '?', ?, '?');`
      await connection.promise().query(sql, [reviewID, userID, productID, reviewText, rating]);
      console.log("Review Added");
    }

    //returns userID for given review id; Example call: Review.getUserID(801);
    static async getUserID(reviewId) {
      let sql = `SELECT userID FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        console.log(result[0].userID);
        return result[0].userID;
      } else {
        console.log("Review not found");
        return null;
      }
    }
    
    //returns productID for given review id; Example call: Review.getProductID(801);
    static async getProductID(reviewId) {

      let sql = `SELECT productID FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        console.log(result[0].productID);
        return result[0].productID;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    //returns star rating for given review id; Example call: Review.getStarRating(801);
    static async getStarRating(reviewId) {

      let sql = `SELECT rating FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        return result[0].rating;
      } else {
        console.log("Review not found");
        return null;
      }
    }

    //returns review id for the given product id; Example call: Review.getReviewid(101);
    static async getReviewIds(productID) {
      let sql = `SELECT reviewID FROM review WHERE productID = ?;`;
      const [results] = await connection.promise().query(sql, [productID]);
      if (results.length > 0) {
        const reviewIDs = results.map(row => row.reviewID);
        return reviewIDs;
      } else {
        console.log("No reviews found for productID:", productID);
        return [];
      }
    }
      

    //returns review text for the given review id; Example call: Review.getReviewText(801);
    static async getReviewText(reviewId) {
      let sql = `SELECT reviewText FROM review WHERE reviewID = ?;`;
      const [result] = await connection.promise().query(sql, [reviewId]);
      if (result.length > 0) {
        return result[0].reviewText;
      } else {
        console.log("Review not found");
        return null;
      } 
    }
    
    //New user id must be an int and for proper functionality must be an existing user id in the database
    //Updates userid associated with review id; Example call: Review.setUserId(801, 401);
    static async setUserId(reviewId, newuserId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.userID = newuserId;

      let sql = `UPDATE review SET userID = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newuserId, reviewId]);
      console.log("Review User Id updated");
    }

    //New product id must be an int and for proper functionality must be an existing product id in the database
    //Updates productid associated with review id; Example call: Review.setProductId(801, 120);
    static async setProductId(reviewId, newproductId) {
      console.log('setting user id for review: ' + reviewId.toString());
      this.productId = newproductId;

      let sql = `UPDATE review SET productID = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newproductId, reviewId]);
      console.log("Review Product Id updated");
    }

    //Star rating must be an int (no decimal ex: 0,1,2,3,4,5); rating cannot be less than 0 or greater than 5;
    //Updates star rating associated with review id; Example call: Review.setStarRating(801, 3);
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

    //Updates review text associated with review id; Review text must be a string; can be an empty string; Example call: Review.setReviewText(801, "bowow");
    static async setReviewText(reviewId, newReviewText) {
      console.log('setting Review text for review: ' + reviewId.toString());
      this.reviewText = newReviewText;

      let sql = `UPDATE review SET reviewText = ? WHERE reviewID = ?;`;
      await connection.promise().query(sql, [newReviewText, reviewId]);
      console.log("Review's Review Text updated");
    }
  }

  //Test data
  //Run: node ./models/Review.js
  //Review.addReview(802, 402, 102, `wow`, 2);
  //Review.getUserID(801);
  //Review.getProductID(801);
  //Review.getStarRating(801);
  //Review.getReviewText(801);


  //Review.setUserId(801, 402);
  //Review.setProductId(801, 120);
  //Review.setStarRating(801, 3);
  //Review.setReviewText(801, "bowow");

  module.exports = Review;