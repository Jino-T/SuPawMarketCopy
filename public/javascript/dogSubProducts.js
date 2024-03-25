$(document).ready(function() {
    async function fetchProducts() {
        try {
            const response = await $.ajax({
                url: '/user/category/food-and-treats', // Adjust if your endpoint differs
                type: 'GET'
            });

            // Assuming the response is an array of product IDs
            for (let product of response[0]) { // Assuming product details are in the first element
                fetchProductDetails(product.prodID);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function fetchProductDetails(productId) {
        try {
            // Make separate API calls for name, description, etc.
            const nameResponse = await $.ajax({url: `/product/name/${productId}`, type: 'GET'});
            const descriptionResponse = await $.ajax({url: `/product/description/${productId}`, type: 'GET'});

            // Use the responses to construct the HTML
            const productHtml = `
                <div class="product">
                    <h3>${nameResponse.productName}</h3>
                    <p>${descriptionResponse.description}</p>
                </div>
            `;

            $('.container').append(productHtml); // Or wherever you want to append the products
        } catch (error) {
            console.error(`Error fetching details for product ${productId}:`, error);
        }
    }

    fetchProducts();
});
