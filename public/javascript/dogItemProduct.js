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
      imageUrl = "../" + imageResponse.imagePath;
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
              <button class="btn btn-success add-to-cart" data-productID="${productId}">Add to Cart</button>
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
