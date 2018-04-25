/* 
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
const Account = require("./account.js");

function getListOfTransactionsFromFile(file) {
    let transactionsArray = [];
    let transactions = file.split("\n");
    transactions.forEach(transaction => {
        var split = transaction.split(",");
        if (split.length === 5) {
            transactionsArray.push(transaction.split(","));
        }
    });
    return getListOfTranscationObjects(transactionsArray);
}

function getListOfTranscationObjects(transactions) {
    let arrayOfListObjects = [];
    transactions.forEach(transaction => {
        if (transactions.indexOf(transaction) != 0) {
            const transactionObject = Transaction.createFromRowArray(transaction);
            arrayOfListObjects.push(transactionObject);
        }
    });
    return arrayOfListObjects;
}

function createAccountsFromTransactions(transactions) {
    let accountList = [];
    transactions.forEach(transaction => {
        let from = transaction.from;
        let to = transaction.to;
        if (accountExists(from, accountList) == false) {
            let account = createAccountFromTransaction(transaction, transactions);
            accountList.push(account);
        }
        if (accountExists(to, accountList) == false) {
            let account = createAccountToTransaction(transaction, transactions);
            accountList.push(account);
        }
    });
    return accountList;
}

function createAccountFromTransaction(transaction, transactions) {
    let transactionsFrom = getListOfTransactionsFrom(transaction.from, transactions);
    let transactionsTo = getListOfTransactionsTo(transaction.from, transactions);
    return new Account(transaction.from, transactionsFrom, transactionsTo);
}
function createAccountToTransaction(transaction, transactions) {
    let transactionsFrom = getListOfTransactionsFrom(transaction.from, transactions);
    let transactionsTo = getListOfTransactionsTo(transaction.from, transactions);
    return new Account(transaction.to, transactionsFrom, transactionsTo);
}

function accountExists(nameToCheck, accounts) {
    let accountExists = false;
    for (i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        if (account.name == nameToCheck) {
            accountExists = true;
            break;
        }
    }
    return accountExists;
}

function getListOfTransactionsFrom(name, transactions) {
    return transactions.filter(transaction => transaction.from == name);
}
function getListOfTransactionsTo(name, transactions) {
    return transactions.filter(transaction => transaction.to == name);
}

const CSVFile = FS.readFileSync("./Transactions2014.csv", "utf8");
const transactionsList = getListOfTransactionsFromFile(CSVFile);
const accounts = createAccountsFromTransactions(transactionsList);

accounts.forEach(account => {
    // console.log(account.name);
    if (account.name == "Laura B") {
        console.log(account.name);
        console.log(account.owed);
    }
});
