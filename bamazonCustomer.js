var mysql = require("mysql");
var inquirer = require("inquirer");

// connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});



function displayItems(){

	//show ids, names, and prices 
}

//ask them the ID of the product they would like to buy.
//and ask how many units of the product they would like to buy.

//check if store has enough of product

//if not-> prompt insufficient quantity

// if so -> fulfill customer's orders
	//updating sql database to reflect remaining quanity
//when order goes through, show customer total cost of their purchase


function initialPrompt() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}