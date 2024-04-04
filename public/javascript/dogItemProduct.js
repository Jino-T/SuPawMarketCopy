$(document).ready(function() {
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

      // Sample static image URL and star rating
      //  const imageUrl = "path/to/product/image.jpg"; // Replace with `imageResponse.imageUrl` when ready
      const starRatingHtml = "★★★★★"; // Replace with dynamic star rating based on product data
      const price = "$29.99"; // Replace with the actual product price
      // Sample static reviews
      const reviewHtml = `
          <div class="review">
            <div class="review-icon">👤</div>
            <p class="review-text">REVIEW1: blahblah blah blah blah blah blahblah blah blahblah blah blah blah blah blah blah blah blah</p>
            <div class="product-rating review-rating">★★★★☆</div>
          </div>
          <div class="review">
            <div class="review-icon">👤</div>
            <p class="review-text">REVIEW2: blahblah blah blah blah blah blahblah blah blahblah blah blah blah blah blah blah blah blah</p>
            <div class="product-rating review-rating">★★★☆☆</div>
          </div>
        `;
      imageUrl = "../" + imageResponse.imagePath;

      const productHtml = `
      <div class="card product-card">
      <div class="card-header">
        <div>
          <div class="header-container">
            <h2 class="card-title">${nameResponse.productName}</h2>
            <div class="star-rating">★★★★★</div>
          </div> 
          <!-- Moving the image here -->
          <img src=${imageUrl} class="product-image" alt="${nameResponse.productName}">
          <div class="card-body">
            <p class="product-description">${descriptionResponse.description}</p>
          </div>
          <div class="product-price">
            <span class="price">${priceResponse.price}</span>
            <button class="btn btn-success add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="reviews">${reviewHtml}</div>
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

  const urlParams = new URLSearchParams(window.location.search);
  const productID = urlParams.get("productID");
  fetchProductDetails(productID);
});
