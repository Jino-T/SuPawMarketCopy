$(document).ready(function() {
    console.log("Current User ID:", userID); // Confirm user ID

    async function fetchCart() {
        try {
            const cartItems = await $.ajax({
                url: `/user/getCart/${userID}`,
                type: "GET"
            });
            $('#cartContainer').empty(); // Clear the cart container before adding new items
            cartItems.forEach(item => {
                fetchProductDetails(item.prodInCart, item.quantity);
            });
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

            addProductToPage(productNameResponse.productName, parseFloat(priceResponse.price), imageResponse.imagePath, productId, quantity);
        } catch (error) {
            console.error(`Error fetching details for product ${productId}:`, error);
        }
    }

    function addProductToPage(productName, price, imagePath, productId, quantity) {
        const formattedPrice = price.toFixed(2);
        const total = (price * quantity).toFixed(2);
        const productHtml = `
            <div class="product-item">
                <img src="${imagePath}" alt="${productName}">
                <div>${productName}</div>
                <div>Price: $${formattedPrice}</div>
                <button type="button" class="minusButton" data-productid="${productId}">-</button>
                <span class="product-quantity" data-productid="${productId}" data-price="${formattedPrice}">${quantity}</span>
                <button type="button" class="plusButton" data-productid="${productId}">+</button>
                <div>Total: $<span class="product-total" data-totalid="${productId}">${total}</span></div>
            </div>
        `;
        $('#cartContainer').append(productHtml);
    }

    $('#cartContainer').on('click', '.plusButton', function() {
        const productId = $(this).data('productid');
        const quantitySpan = $(this).siblings('.product-quantity');
        const price = parseFloat(quantitySpan.data('price'));
        let quantity = parseInt(quantitySpan.text());
        quantity++;
        quantitySpan.text(quantity);
        updateProductTotal(productId, quantity, price);
        addToCart(productId, 1); // Add one to the cart
    });

    $('#cartContainer').on('click', '.minusButton', function() {
        const productId = $(this).data('productid');
        const quantitySpan = $(this).siblings('.product-quantity');
        const price = parseFloat(quantitySpan.data('price'));
        let quantity = parseInt(quantitySpan.text());
        if (quantity > 1) {
            quantity--;
            quantitySpan.text(quantity);
            updateProductTotal(productId, quantity, price);
            addToCart(productId, -1); // Subtract one from the cart
        }
    });

    function updateProductTotal(productId, quantity, price) {
        const total = (price * quantity).toFixed(2);
        $(`[data-totalid="${productId}"]`).text(total);
        updateCartSummary();
    }

    async function addToCart(productID, quantity) {
        try {
            const data = JSON.stringify({ productID, quantity });
            await $.ajax({
                url: "/addToCart",
                type: "POST",
                headers: { "Content-Type": "application/json" },
                data: data, 
                success: function(response) {
                    console.log("Product added or updated in cart:", response);
                },
                error: function(xhr, status, error) {
                    console.error("Error updating cart:", error);
                }
            });
        } catch (error) {
            console.error("Error adding or subtracting product in cart:", error);
        }
    }

    function updateCartSummary() {
        let subtotal = 0;
        $('.product-total').each(function() {
            subtotal += parseFloat($(this).text());
        });
        $('#subtotal').text(subtotal.toFixed(2));
        const salesTax = subtotal * 0.08;
        $('#sales').text(salesTax.toFixed(2));
        const grandTotal = subtotal + salesTax;
        $('#grand').text(grandTotal.toFixed(2));
    }

    fetchCart();
});
