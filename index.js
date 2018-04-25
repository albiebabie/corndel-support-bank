/* 
The person in the 'From' column is paying money, 
so the amount needs to be deducted from their account. 

The person in the 'To' column is being paid, 
so the amount needs to be added to their account. 

Use a class for each type of object you want to create.

Your program should support two commands, 
which can be typed in on the console:





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
const UserInput = require("./userInput.js");

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

function listAllAccounts(accounts) {
    accounts.forEach(account => {
        console.log(account.name);
        console.log(account.displayBalance());
    });
}

function listAccountByName(name, accounts) {
    // List [Account] should also print a list of every transaction,
    // with the date and narrative, for that account with that name.

    console.log(`Account: ${name}`);
    console.log("Transactions: ");
    const account = accounts.filter(account => account.name === name)[0];
    // console.log(account);

    const owesTransactions = account.owes;
    console.log("______Owes Transactions______");
    // console.log(owesTransactions);

    owesTransactions.forEach(transaction => {
        console.log("Date: " + transaction.date);
        console.log("From: " + transaction.from);
        console.log("To: " + transaction.to);
        console.log("Narrative: " + transaction.narrative);
        console.log("Amount: £" + transaction.amount + "\n");
    });

    const owedTransactions = account.owed;
    console.log("______Owed Transactions______");
    owedTransactions.forEach(transaction => {
        console.log("Date: " + transaction.date);
        console.log("From: " + transaction.from);
        console.log("To: " + transaction.to);
        console.log("Narrative: " + transaction.narrative);
        console.log("Amount: £" + transaction.amount + "\n");
    });
}

function printWelcomeMessage() {
    console.log(`Welcome to the Support Bank`);
}

function getAccountViewMode() {
    return UserInput.getStringWithPrompt(`How do you want to view the accounts?
${ModeListAllAccounts} View All Accounts
${ModeListAccountByName} View Account By Name`);
}

const CSVFile = FS.readFileSync("./Transactions2014.csv", "utf8");
const transactionsList = getListOfTransactionsFromFile(CSVFile);
const accounts = createAccountsFromTransactions(transactionsList);
const ModeListAllAccounts = "1";
const ModeListAccountByName = "2";

printWelcomeMessage();
const viewMode = getAccountViewMode();
if (viewMode == ModeListAllAccounts) {
    listAllAccounts(accounts);
} else if (viewMode == ModeListAccountByName) {
    const accountName = UserInput.getStringWithPrompt("Enter an Account Name");
    // console.log(accounts);
    const matchedAccount = listAccountByName(accountName, accounts);
    // console.log(matchedAccount);
}
