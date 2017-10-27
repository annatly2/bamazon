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
  //displayItems();
  initialPrompt();
});

//ask them the ID of the product they would like to buy.
//and ask how many units of the product they would like to buy.

//check if store has enough of product

//if not-> prompt insufficient quantity

// if so -> fulfill customer's orders
	//updating sql database to reflect remaining quantity
//when order goes through, show customer total cost of their purchase
//thank you for your purchase



function initialPrompt() {

  console.log("Displaying all items available...\n");
  connection.query("SELECT * FROM products", function (err, res){

    if (err) throw err;

    for(i = 0; i < res.length; i++){
      var productID = res[i].item_id;
      var productName = res[i].product_name;
      var productPrice = res[i].price;
      console.log("\n(Id# " + productID+ ") " + productName+ " $" + productPrice);
    }
    //endConnection();

  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID # (1 through 10) of the product you would like to buy".magenta,
        name: "id"
      },
      {
        type: "input",
        message: "How many would you like to buy?".magenta,
        name: "unit"
      }
    ])
    .then(function(answer) {
      var idWanted = answer.id;
      var unitWanted = answer.unit;
      var newIndex = parseInt(idWanted - 1);

      console.log("Id" + idWanted);
      console.log("Unit: "+ unitWanted);

      console.log(res[newIndex].item_id);
      console.log(res[newIndex].product_name);



    //assign this id to an id from the mysql list
      
    });

  });
}

function checkIfAvailable(){
    connection.query("SELECT * FROM products", function (err, res){

    if (err) throw err;

    console.log("checking" +res[newIndex].product_name);



  //   for(i = 0; i < res.length; i++){
  //     var productID = res[i].item_id;
  //     var productName = res[i].product_name;
  //     var productPrice = res[i].price;
  //     console.log("\n(Id# " + productID+ ") " + productName+ " $" + productPrice);
  //   }

  // console.log()

}
}


function endConnection(){
  connection.end();
}