const Product = require('./models/Product'); // Adjust the path as needed
const db = require('./database').databaseConnection; // Adjust the path as needed

async function insertTestProduct() {
    // Define test product details
    const productName = 'Test Product';
    const price = 19.99;
    const inventory = 100; // This will be the quantity you test
    const description = 'This is a test product description.';
    const imagePath = '/path/to/image.jpg';

    // Insert test product and return the inserted product ID
    const insertSql = `INSERT INTO product (productName, price, inventory, description, imagePath) 
                       VALUES (?, ?, ?, ?, ?)`;
    const [insertResult] = await db.promise().query(insertSql, [productName, price, inventory, description, imagePath]);
    return insertResult.insertId;
}

async function testGetQuantity() {
    try {
        // Insert a test product and get its ID
        const productId = await insertTestProduct();
        
        // Use the inserted product ID to test getQuantity
        const quantity = await Product.getQuantity(productId);
        console.log(`Quantity for product ID ${productId}: ${quantity}`);

        // Optionally, clean up by removing the test product after the test
        // const deleteSql = `DELETE FROM product WHERE productID = ?`;
        // await db.promise().query(deleteSql, [productId]);
    } catch (error) {
        console.error('Failed to test get product quantity:', error);
    }
}

testGetQuantity();
