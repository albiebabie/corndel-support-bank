/* 
Write a program which creates an account for each person, 
and then creates transactions between the accounts. 

The person in the 'From' column is paying money, 
so the amount needs to be deducted from their account. 

The person in the 'To' column is being paid, 
so the amount needs to be added to their account. 

Use a class for each type of object you want to create.

Your program should support two commands, 
which can be typed in on the console:

List All should output the names of each person, 
and the total amount the owe, or are owed.
List [Account] should also print a list of every transaction, 
with the date and narrative, for that account with that name.


Hints:

You will need to accept user input - the readline-sync package covers this.
The JavaScript Date class is extremely bothersome to use. We recommend you parse your date strings using the moment package instead: install it with npm install moment and see this link for documentation on how to parse dates.
Either parse the file yourself, or search NPM for a relevant CSV parsing library!
*/

const fs = require("fs");
// const parse = require("csv-parse");
// fs.readFile(inputPath, function(err, fileData) {
//     parse(fileData, { columns: false, trim: true }, function(err, rows) {
//         // Your CSV data is in an array of arrys passed to this callback as rows.
//     });
// });

const csvFile = fs.readFileSync("./Transactions2014.csv", "utf8");
console.log(csvFile);
