# Bamazon

Bamazon is an Amazon-like storefront operating on the command line using node and MySQL.  This app takes in orders from customers and depletes stock from the store's inventory. Customers are able to purchase one type item at a time.

To get started...

1. Clone this git repository. 

2. Ensure that your SQL server is running. You can do this by typing `mysql.server start` in your terminal.

3. Open the bamazonDB.sql in MySQLWorkbench to view the MySQL Database.

3. Type `npm install` to install all the dependencies found on the package.json file.

Once you have completed the steps above, type `node bamazonCustomer.js` to start having fun with Bamazon!  The app will prompt you for user input when necessary.

Below are screenshots of how the app works.


1. Initial database


![initial](/images/1.png)

2. Type node bamazonCustomer.js in command line

3. Type in id of product

4. Type in amount of product

5. Before purchase - database unchanged

6. After puchase - database is changed

7. Buying more than what is available (at least 1 of the item is in stock)

8. Buying more than what is available - sql database changes

9. Buying something that is not in stock

10. Buying something that is not in stock (continued)

