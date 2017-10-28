var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require('cli-table');

// connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id " + connection.threadId+ "\n");
  initialPrompt();
});

//function that displays a table with available items for sale and asks user what they would like to purchase and how many
function initialPrompt() {
  console.log("Displaying all items available...\n");
  connection.query("SELECT * FROM products", function (err, res){
    if (err) throw err;

    var productID;
    var productName;
    var productPrice;
    var productQuantity;

    for(var i = 0; i < res.length; i++){
      productID = res[i].item_id;
      productName = res[i].product_name;
      productPrice = res[i].price.toFixed(2);
      productQuantity = res[i].stock_quantity;
    }
    //table with available items
    var table = new Table({
        head: ["ID", "Name", "Price"]
        , colWidths: [5, 25, 10]
      });

    for(var i = 0; i < res.length; i ++){
        table.push([
        res[i].item_id, res[i].product_name, "$" + res[i].price.toFixed(2)])
      }
      console.log(table.toString());

//initial questions of what product and how many
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID # (1 through 10) of the product you would like to buy".magenta.bold,
        name: "id"
      },
      {
        type: "input",
        message: "How many would you like to buy?".magenta.bold,
        name: "unit"
      }
    ])
    .then(function(answer) {
      var idWanted = answer.id;
      var unitWanted = answer.unit;
      var newIndex = parseInt(idWanted - 1); //index of item wanted

      var productWanted = res[newIndex].product_name;
      productQuantity = res[newIndex].stock_quantity;
      var updatedStock = productQuantity - unitWanted;
      var totalPrice = (res[newIndex].price*unitWanted).toFixed(2);

      console.log("Give us a moment to check if your item (" + productWanted + ") is available...");
      console.log("Current Supply: " + productQuantity);
      console.log("Customer would like to buy: " +unitWanted);

      //if the item is in stock
      if (unitWanted <= parseInt(productQuantity)){
          placeOrder(updatedStock, productWanted, totalPrice, productQuantity, true);

      //if the user wants more than what is available, and there is at least one item available
      }else if(unitWanted > parseInt(productQuantity) && parseInt(productQuantity) > 0){
          placeOrder(0, productWanted, totalPrice, productQuantity, false);

      //if there are none in stock
      }else if(parseInt(productQuantity) === 0){
          console.log("Sorry, we are ALL SOLD OUT of that item! Please make another purchase below.".red.bold);
          initialPrompt();
      }
    });

  });
}

//function that takes in multiple parameters and updates MySQL database
function placeOrder(quantity, productWanted, totalPrice, productQuantity, available){
  connection.query(
          //updates the stock quantity in MySQL
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: quantity
            },
            {
              product_name: productWanted
            }
          ], function(error, res){
              if (error) throw error;
              if(available === false){
                console.log("We do not have that many available. You can purchase " + productQuantity);
                console.log("The total is".cyan.bold + " $" + totalPrice);
                console.log("Come back another time to buy the rest when we've restocked.");
              }else{
                console.log("You have successfully made a purchase!".green.bold);
                console.log("The total is".cyan.bold + " $" + totalPrice);
              }
              endConnection();
          })
}

//ends connection
function endConnection(){
  connection.end();
}