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
The JavaScript Date class is extremely bothersome to use. 
We recommend you parse your date strings using the moment package instead: 
install it with npm install moment and see this link for documentation on how to parse dates.
Either parse the file yourself, or search NPM for a relevant CSV parsing library!
*/

const FS = require("fs");
const Transaction = require("./transaction.js");
const CSVFile = FS.readFileSync("./Transactions2014.csv", "utf8");
const transactionsList = getListOfTransactionsFromFile(CSVFile);

function getListOfTransactionsFromFile(file) {
    let transactionsArray = [];
    let transactions = file.split("\n");
    transactions.forEach(transaction => {
        transactionsArray.push(transaction.split(","));
    });
    let listOfTransactionObjects = getListOfTranscationObjects(transactionsArray);
    return listOfTransactionObjects;
}

function createNewTransactionObject(transactionArray) {
    var date = getTransactionDate(transactionArray);
    var from = getTransactionFrom(transactionArray);
    var to = getTransactionTo(transactionArray);
    var narrative = getTransactionNarrative(transactionArray);
    var amount = getTransactionAmount(transactionArray);
    return new Transaction(date, from, to, narrative, amount);
}

function getTransactionDate(transaction) {
    return transaction[0];
}
function getTransactionFrom(transaction) {
    return transaction[1];
}
function getTransactionTo(transaction) {
    return transaction[2];
}
function getTransactionNarrative(transaction) {
    return transaction[3];
}
function getTransactionAmount(transaction) {
    return transaction[4];
}

function getListOfTranscationObjects(transactions) {
    let arrayOfListObjects = [];
    transactions.forEach(transaction => {
        if (transactions.indexOf(transaction) != 0) {
            const transactionObject = createNewTransactionObject(transaction);
            arrayOfListObjects.push(transactionObject);
        }
    });
    return arrayOfListObjects;
}
