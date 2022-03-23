const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// Parse to JSON
app.use(bodyParser.json());

// DB Connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tasanah27",
  database: "db_express_rest",
});

// Connect to DB
conn.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Get All Products
app.get("/api/products", (req, res) => {
  let sql = "SELECT * FROM tbl_product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, data: results });
  });
});

// Get Product by ID
app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM tbl_product WHERE product_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, data: results });
  });
});

// Add new product
app.post("/api/products", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
  };
  let sql = "INSERT INTO tbl_product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, data: results });
  });
});

// Update product by ID
app.put("/api/products/:id", (req, res) => {
  let sql =
    "UPDATE tbl_product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "' WHERE product_id=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, data: results });
  });
});

// Remove product
app.delete("/api/products/:id", (req, res) => {
  let sql = "DELETE FROM tbl_product WHERE product_id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, data: results });
  });
});

// Server listening
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
