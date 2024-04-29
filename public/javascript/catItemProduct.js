$(document).ready(function() {

  async function fetchReviewDetails(reviewID) {
    const reviewTextResponse = await $.ajax({
      url: `/reviews/text/${reviewID}`,
      type: "GET"
    });
    const reviewRatingResponse = await $.ajax({
      url: `/reviews/rating/${reviewID}`,
      type: "GET"
    });
    // Assuming reviewRatingResponse.rating returns a number 0-5, convert to stars
    const starRating = "★".repeat(reviewRatingResponse.rating) + "☆".repeat(5 - reviewRatingResponse.rating);

    return {
      reviewText: reviewTextResponse.reviewText,
      starRating
    };
  }

  async function fetchProductDetails(productId) {
    try {
      const nameResponse = await $.ajax({
        url: `/product/name/${productId}`,
        type: "GET"
      });
      const descriptionResponse = await $.ajax({
        url: `/product/description/${productId}`,
        type: "GET"
      });
      const priceResponse = await $.ajax({
        url: `/product/price/${productId}`,
        type: "GET"
      });
      const imageResponse = await $.ajax({
        url: `/product/image/${productId}`,
        type: "GET"
      });

      const reviewIDsResponse = await $.ajax({
        url: `/reviews/reviewIDs/${productId}`,
        type: "GET"
      });

      let allReviewHtml = "";

      for (const reviewID of reviewIDsResponse.reviewIDs) {
        const { reviewText, starRating } = await fetchReviewDetails(reviewID);

        allReviewHtml += `
          <div class="review">
            <div class="review-icon">👤</div>
            <p class="review-text">${reviewText}</p>
            <div class="product-rating review-rating">${starRating}</div>
          </div>
        `;
      }


      // Sample static image URL and star rating
      imageUrl = "../" + imageResponse.imagePath;
      const price = priceResponse.price; // Replace with the actual product price

      const productHtml = `
        <div class="card product-card">
        <div class="card-header">
          <div>
            <div class="header-container">
              <h2 class="card-title">${nameResponse.productName}</h2>
              <div class="product-image-container"> <!-- Container to center the image -->
                 <img src=${imageUrl} class="product-image" alt="${nameResponse.productName}">
              </div>
            </div>             
            <div class="card-body">
              <p class="product-description">${descriptionResponse.description}</p>
            </div>
            <div class="product-price">
              <span class="price">${price}</span>
              <button class="btn btn-success add-to-cart" data-productID="${productId}">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="reviews">${allReviewHtml}</div>
          <div class="review-button">
            <button class="btn btn-primary leave-review">Leave a Review</button>
          </div>
        </div>
      </div>    
      `;

      $("#productContainer").append(productHtml);
    } catch (error) {
      console.error(`Error fetching details for product ${productId}:`, error);
    }
  }

  // Function to add product to cart
  async function addToCart(productID, quantity) {
    try {
      const data = JSON.stringify({ productID, quantity });
      await $.ajax({
        url: "/addToCart",
        type: "POST",
        headers: { "Content-Type": "application/json" },
        data: data, 
        success: function(response) {
          console.log("Product added to cart:", response);
        },
        error: function(xhr, status, error) {
          console.error("Error in JS adding product to cart:", error);
        }
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
  async function submitReview(productId, reviewText, starRating) {
    try {
      const data = JSON.stringify({ productId, reviewText, starRating });
      await $.ajax({
        url: "/submitReview",
        type: "POST",
        headers: { "Content-Type": "application/json" },
        data: data,
        success: function(response) {
          console.log("Review submitted successfully:", response);
          // After successful submission, fetch and display updated product details
          fetchProductDetails(productId);
        },
        error: function(xhr, status, error) {
          console.error("Error submitting review:", error);
        }
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }

  $(document).on("click", ".leave-review", function() {
    const productId = urlParams.get("productID");
    const reviewText = prompt("Type out your review (200 characters or less):");
    const starRating = parseInt(prompt("Enter star rating (A number 0-5):")); // Assuming user enters a number
    if (reviewText !== null && starRating >= 0 && starRating <= 5) {
      submitReview(productId, reviewText, starRating);
    }
  });


  

  // Event listener for Add to Cart button
  $(document).on("click", ".add-to-cart", function() {
    const productId = urlParams.get("productID");
    const quantity = 1; // Assuming quantity is 1 for now, you can change it if needed
    console.log("Adding product to cart:", productId, quantity);
    addToCart(productId, quantity);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const productID = urlParams.get("productID");
  fetchProductDetails(productID);
});
