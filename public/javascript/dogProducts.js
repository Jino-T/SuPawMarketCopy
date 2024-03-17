
$(document).ready(function() {
    $('#inventoryForm').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        const productId = $('#productIdInput').val();

        $.ajax({
            url: '/product/quantity/' + productId, // Make sure the URL matches your routing
            type: 'GET',
            success: function(data) {
                $('#inventoryResult').html(`Inventory: ${data.quantity}`);
            },
            error: function(xhr, status, error) {
                $('#inventoryResult').html("Failed to fetch inventory. " + xhr.responseText);
            }
        });
    });
});
