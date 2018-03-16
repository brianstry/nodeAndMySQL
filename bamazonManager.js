var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "bssb2a16",
    database: "bamazondb"
});



connection.connect(function (err) {
    if (err) throw err;

    start();
});

function start() {

    inquirer
        .prompt({
            name: "userChoice",
            type: "list",
            message: "what is the ID of the item you would like to buy?",
            choices: ["Products for sale", "Low inventory", "Add invantory", "Add new product"]
        }).then(function (answer) {
            console.log(answer);
            if (answer === "Products for sale") {
                listInventory();
            } else if (answer === "Low inventory") {
                lowInventory();
            } else if (answer === "Add invantory") {
                listInventory();
            } else if (answer === "Add new product") {
                listInventory();
            }

                var itemID = parseInt(answer.itemToBuy) - 1;

            if (results[itemID].stock_quantity > parseInt(answer.amount)) {

                var afterPurchase = results[itemID].stock_quantity - parseInt(answer.amount);

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: afterPurchase
                        },
                        {
                            item_id: answer.itemToBuy
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Purchase successful");
                        // start();
                    }
                );
            } else {
                console.log("sorry to say, our on hands can not match that pyrchase amount at this time.");
                // start();
            }
        })

}

function listInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(`
    ID:         ${results[i].item_id},
    Item:       ${results[i].product_name},
    Price:      ${results[i].price},
    On_hands:   ${results[i].stock_quantity}`);
        }
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.log(`
    ID:         ${results[i].item_id},
    Item:       ${results[i].product_name},
    Price:      ${results[i].price},
    On_hands:   ${results[i].stock_quantity}`);
            }
        }
    })
}
