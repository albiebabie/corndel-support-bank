const FS = require("fs");
const Account = require("./account");
const UserInput = require("./userInput");
const ParseCSV = require("./parseCSV");

function listAllAccounts(accounts) {
    console.log("\nAccounts: \n");
    accounts.forEach(account => {
        console.log(account.name);
        console.log("-------------");
        console.log(account.displayBalance() + "\n");
    });
}

function listAccountByName(name, accounts) {
    console.log(`Account: ${name}`);
    console.log("Transactions: ");
    const account = accounts.filter(account => account.name === name)[0];
    const owesTransactions = account.owes;
    console.log("______Owes Transactions______");
    printTransactions(owesTransactions);
    const owedTransactions = account.owed;
    console.log("______Owed Transactions______");
    printTransactions(owedTransactions);
}

function printTransactions(transactions) {
    transactions.forEach(transaction => {
        printTransaction(transaction);
    });
}

function printTransaction(transaction) {
    console.log("Date: " + transaction.date);
    console.log("From: " + transaction.from);
    console.log("To: " + transaction.to);
    console.log("Narrative: " + transaction.narrative);
    console.log("Amount: £" + transaction.amount + "\n");
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
const transactions = ParseCSV.getTransactionsFromFile(CSVFile);
const accounts = ParseCSV.createAccountsFromTransactions(transactions);

const ModeListAllAccounts = "1";
const ModeListAccountByName = "2";

printWelcomeMessage();
const viewMode = getAccountViewMode();
if (viewMode == ModeListAllAccounts) {
    listAllAccounts(accounts);
} else if (viewMode == ModeListAccountByName) {
    const accountName = UserInput.getStringWithPrompt("Enter an Account Name");
    const matchedAccount = listAccountByName(accountName, accounts);
    console.log(matchedAccount);
}
