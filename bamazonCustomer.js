var mysql = require("mysql");
var inquirer = require("inquirer");

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
  //displayItems();
  initialPrompt();
});

function displayItems(){
  console.log("Displaying all items available...\n");
  connection.query("SELECT * FROM products", function (err, res){
    if (err) throw err;
    for(i = 0; i < res.length; i++){
      console.log("(Id# " + res[i].item_id + ") " + res[i].product_name + " $" + res[i].price);
    }
    endConnection();
  });
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
      name: "id",
      type: "input",
      message: "Enter the ID # (just the number) of the product you would like to buy"
    },{
      name: "quantity",
      type: "input",
      message: "How many would you like of this product?"
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


function endConnection(){
  connection.end();
}