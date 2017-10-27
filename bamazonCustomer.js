var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

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

function initialPrompt() {
  console.log("Displaying all items available...\n");
  connection.query("SELECT * FROM products", function (err, res){

    if (err) throw err;

    var productID;
    var productName;
    var productPrice;
    var productQuantity;

    for(i = 0; i < res.length; i++){
      productID = res[i].item_id;
      productName = res[i].product_name;
      productPrice = res[i].price;
      productQuantity = res[i].stock_quantity;
      console.log("\n(ID# " + productID+ ") " + productName+ " $" + productPrice);
    }

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
      var newIndex = parseInt(idWanted - 1);

      var productWanted = res[newIndex].product_name;
      productQuantity = res[newIndex].stock_quantity;
      var updatedStock = productQuantity - unitWanted;
      var totalPrice = res[newIndex].price*unitWanted;

      console.log("Give us a moment to check if your item (" + productWanted + ") is available...");
      console.log("Current Supply: " + productQuantity);
      console.log("Customer would like to buy: " +unitWanted);

      if (unitWanted <= parseInt(productQuantity)){
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: updatedStock
            },
            {
              product_name: productWanted
            }
          ], function(error){
              if (error) throw error;
              console.log("You have successfully made a purchase!".green.bold);
              console.log("The total costs is".cyan.bold + " $" + totalPrice);
              console.log("Thanks for shopping at our store. We'll see you next time!".green.bold);
              endConnection();
          })
      }else if(unitWanted > parseInt(productQuantity) && parseInt(productQuantity) > 0){
          connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: 0
            },
            {
              product_name: productWanted
            }
          ], function(error){
              if (error) throw error;
              totalPrice = res[newIndex].price*productQuantity;
              console.log("We do not have that many available. You can purchase " + productQuantity);
              console.log("You have successfully made a purchase!".green.bold);
              console.log("The total costs is".cyan.bold + " $" + totalPrice);
              console.log("Come back another time to see if we've restocked");
              endConnection();
          })
      }else if(parseInt(productQuantity) === 0){
          console.log("Sorry, we are ALL SOLD OUT of that item! Please make another purchase below.".red.bold);
          initialPrompt();
      }
    });

  });
}

function endConnection(){
  connection.end();
}