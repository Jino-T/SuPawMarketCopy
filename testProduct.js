const Product = require("./models/Product"); // Adjust the path as needed
const db = require("./database").databaseConnection; // Adjust the path as needed
const User = require("./models/User"); // Adjust the path as needed
const UserController = require("./controllers/UserController");

// async function insertTestCategory(categoryName) {
//     const insertCategorySql = `INSERT INTO category (categoryName) VALUES (?)`;
//     const [categoryResult] = await db.promise().query(insertCategorySql, [categoryName]);
//     return categoryResult.insertId;
// }

// async function insertTestProduct(productName, categoryId) {
//     const price = 19.99;
//     const inventory = 100; // This will be the quantity you test
//     const description = 'This is a test product description.';
//     const imagePath = '/path/to/image.jpg';

//     // Insert test product and return the inserted product ID
//     const insertSql = `INSERT INTO product (productName, price, inventory, description, imagePath)
//                        VALUES (?, ?, ?, ?, ?)`;
//     const [insertResult] = await db.promise().query(insertSql, [productName, price, inventory, description, imagePath]);
//     const productId = insertResult.insertId;

//     const insertInCategorySql = `INSERT INTO inCategory (catID, prodID) VALUES (?, ?)`;
//     await db.promise().query(insertInCategorySql, [categoryId, productId]);

//     return productId;
// }

async function testProductsByCategory() {
  try {
    // Setup test data
    const categoryName = "food-and-treats";
    const products = await UserController.productsByCat(categoryName);

    console.log(`Products in category ${categoryName}:`, products);

  } catch (error) {
    console.error("Failed to test productsByCat:", error);
  }
}

testProductsByCategory();

// async function insertTestProduct() {
//     // Define test product details
//     const productName = 'Test Product';
//     const price = 19.99;
//     const inventory = 100; // This will be the quantity you test
//     const description = 'This is a test product description.';
//     const imagePath = '/path/to/image.jpg';

//     // Insert test product and return the inserted product ID
//     const insertSql = `INSERT INTO product (productName, price, inventory, description, imagePath)
//                        VALUES (?, ?, ?, ?, ?)`;
//     const [insertResult] = await db.promise().query(insertSql, [productName, price, inventory, description, imagePath]);
//     return insertResult.insertId;
// }

// async function testGetQuantity() {
//     try {
//         // Insert a test product and get its ID
//         // const productId = await insertTestProduct();

//         // Use the inserted product ID to test getQuantity
//         const res = await Product.getProductInfo(1);
//         console.log(`Quantity for product ID ${1}: ${res[0]}`);

//         // Optionally, clean up by removing the test product after the test
//         // const deleteSql = `DELETE FROM product WHERE productID = ?`;
//         // await db.promise().query(deleteSql, [productId]);
//     } catch (error) {
//         console.error('Failed to test get product quantity:', error);
//     }
// }

// testGetQuantity();
