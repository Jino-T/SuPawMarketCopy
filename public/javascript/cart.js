$(document).ready(function() {
    // Use the global variable userID defined in the EJS template
    console.log("Current User ID:", userID);

    async function fetchCart() {
        try {
            const cartItems = await $.ajax({
                url: `/user/getCart/${userID}`,
                type: "GET"
            });

            for (const item of cartItems) {
                await fetchProductDetails(item.prodInCart, item.quantity);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    async function fetchProductDetails(productId, quantity) {
        try {
            const [productNameResponse, priceResponse, imageResponse] = await Promise.all([
                $.ajax({ url: `/product/name/${productId}`, type: "GET" }),
                $.ajax({ url: `/product/price/${productId}`, type: "GET" }),
                $.ajax({ url: `/product/image/${productId}`, type: "GET" })
            ]);

            addProductToPage(productNameResponse.productName, priceResponse.price, imageResponse.imagePath, productId, quantity);
        } catch (error) {
            console.error(`Error fetching details for product ${productId}:`, error);
        }
    }

    function addProductToPage(productName, price, imagePath, productId, quantity) {
        const productHtml = `
            <div class="product-item">
                <img src="${imagePath}" alt="${productName}">
                <div>${productName}</div>
                <div>Price: $${price}</div>
                <div>Quantity: <input type="number" value="${quantity}" min="0" class="product-quantity" data-productid="${productId}"></div>
                <div>Total: $<span class="product-total">${(price * quantity).toFixed(2)}</span></div>
            </div>
        `;

        $('#cartContainer').append(productHtml);
    }

    $(document).on('change', '.product-quantity', async function() {
        const productId = $(this).data('productid');
        const newQuantity = parseInt($(this).val());

        try {
            await $.ajax({
                url: `/user/addToCart`,
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    userID: userID,
                    info: {
                        productID: productId,
                        quantity: newQuantity
                    }
                })
            });

            // Update the display for the product total
            fetchCart(); // Reload cart to reflect updated quantity
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    });

    fetchCart();
});
