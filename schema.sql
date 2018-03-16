DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL auto_increment,
  product_name VARCHAR(100) NOT NULL,
  deprtment_name VARCHAR(100) NOT NULL,
  price DECIMAL (10,2),
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;