DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);


USE bamazonDB;
SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vacuum cleaner", "appliances", 47.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toaster oven", "appliances", 23.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("oven mitt", "kitchen", 5.25, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dish soap", "cleaning supplies", 3.25, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nail polish", "beauty", 4.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mascara", "beauty", 3.49, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("airfryer", "appliances", 70.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("whisk", "kitchen", 5.49, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("disinfectant spray", "cleaning supplies", 6.50, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("castiron skillet", "kitchen", 41.50, 10);
