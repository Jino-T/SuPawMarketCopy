$(document).ready(function() {
  async function fetchProducts(category) {
    try {
      const response = await $.ajax({
        url: `/user/category/${category}`,
        type: "GET"
      });

      for (let product of response[0]) {
        fetchProductDetails(product.prodID);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
      // const imageResponse = await $.ajax({
      //   url: `/product/image/${productId}`,
      //   type: "GET"
      // });

      // Sample static image URL and star rating
      const imageUrl = "path/to/product/image.jpg"; // Replace with `imageResponse.imageUrl` when ready
      const starRatingHtml = "★★★★★"; // This should be dynamic based on product rating
      //       <img src="${imageUrl}" class="card-img-top product-image" alt="${nameResponse.productName}">

      const productHtml = `
          <div class="col-md-4 col-sm-6 mb-4">
            <div class="card product-card h-100">
            <!-- Image goes here --!>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${nameResponse.productName}</h5>
                <div class="product-rating mb-2">${starRatingHtml}</div>
                <p class="card-text flex-grow-1">${descriptionResponse.description}</p>
              </div>
            </div>
          </div>
        `;

      $("#productsContainer").append(productHtml);
    } catch (error) {
      console.error(`Error fetching details for product ${productId}:`, error);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  // Initialize products container as a row for Bootstrap grid system
  $("#productsContainer").addClass("row");

  fetchProducts(category);
});
