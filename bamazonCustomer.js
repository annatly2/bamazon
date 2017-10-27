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

// function displayItems(){
//   console.log("Displaying all items available...\n");
//   connection.query("SELECT * FROM products", function (err, res){
//     if (err) throw err;
//     for(i = 0; i < res.length; i++){
//       console.log("\n(Id# " + res[i].item_id + ") " + res[i].product_name + " $" + res[i].price);
//     }
//     endConnection();
//   });
// }



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
        name: "id",
        type: "input",
        message: "Enter the ID # (1 through 10) of the product you would like to buy"
      },
      {
        name: "unit",
        type: "input",
        message: "How many would you like to buy?"
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



function endConnection(){
  connection.end();
}