const express = require('express');
const Review = require('../models/Review');

class ReviewController {

  static async addReview(req, res) {
    try {
      const { reviewID, userID, productID, reviewText, rating } = req.body;
      await Review.addReview(reviewID, userID, productID, reviewText, rating);
      res.status(201).send('Review added successfully');
    } catch (error) {
      console.error('Error adding the review:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getUserID(req, res) {
    try {
      const reviewId = req.params.reviewId;
      const userID = await Review.getUserID(reviewId);
      if (userID) {
        res.json({ userID });
      } else {
        res.status(404).send('Review not found');
      }
    } catch (error) {
      console.error('Error getting user ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getProductID(req, res) {
    try {
      const reviewId = req.params.reviewId;
      const productID = await Review.getProductID(reviewId);
      if (productID) {
        res.json({ productID });
      } else {
        res.status(404).send('Review not found');
      }
    } catch (error) {
      console.error('Error getting product ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getStarRating(req, res) {
    try {
      const reviewId = req.params.reviewId;
      const rating = await Review.getStarRating(reviewId);
      if (rating !== null) {
        res.json({ rating });
      } else {
        res.status(404).send('Review not found');
      }
    } catch (error) {
      console.error('Error getting star rating:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getReviewText(req, res) {
    try {
      const reviewId = req.params.reviewId;
      const reviewText = await Review.getReviewText(reviewId);
      if (reviewText !== null) {
        res.json({ reviewText });
      } else {
        res.status(404).send('Review not found');
      }
    } catch (error) {
      console.error('Error getting review text:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async setUserId(req, res) {
    try {
      const { reviewId, newUserId } = req.body;
      await Review.setUserId(reviewId, newUserId);
      res.send('Review user ID updated successfully');
    } catch (error) {
      console.error('Error setting user ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async setProductId(req, res) {
    try {
      const { reviewId, newProductId } = req.body;
      await Review.setProductId(reviewId, newProductId);
      res.send('Review product ID updated successfully');
    } catch (error) {
      console.error('Error setting product ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async setStarRating(req, res) {
    try {
      const { reviewId, newStarRating } = req.body;
      await Review.setStarRating(reviewId, newStarRating);
      res.send('Review star rating updated successfully');
    } catch (error) {
      console.error('Error setting star rating:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async setReviewText(req, res) {
    try {
      const { reviewId, newReviewText } = req.body;
      await Review.setReviewText(reviewId, newReviewText);
      res.send('Review text updated successfully');
    } catch (error) {
      console.error('Error setting review text:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getReviewIds(req, res) {
    try {
      const productID = req.params.productID;
      const reviewIDs = await Review.getReviewIds(productID);
      if (reviewIDs.length > 0) {
        res.json({ reviewIDs });
      } else {
        res.status(404).send('No reviews found for this product');
      }
    } catch (error) {
      console.error('Error getting review IDs:', error);
      res.status(500).send('Internal Server Error');
    }
  }

}


module.exports = ReviewController;
