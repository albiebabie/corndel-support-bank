const FS = require("fs");
const Account = require("./account");
const UserInput = require("./userInput");
const ParseCSV = require("./parseCSV");
const ParseJSON = require("./parseJSON");
const SupportBank = require("./supportBank");
const log4js = require("log4js");
const Logger = log4js.getLogger("./index.js");

log4js.configure({
    appenders: {
        file: { type: "fileSync", filename: "logs/debug.log" }
    },
    categories: {
        default: { appenders: ["file"], level: "debug" }
    }
});

function printWelcomeMessage() {
    console.log(`Welcome to the Support Bank`);
}

function getAccountViewMode() {
    return UserInput.getStringWithPrompt(
        `How do you want to view the accounts?\n` +
            `${ModeListAllAccounts} View All Accounts\n` +
            `${ModeListAccountByName} View Account By Name`
    );
}

function createTransactionsFromRows(rows) {
    let transactions = [];
    rows.forEach(row => {
        const transaction = Transaction.createFromRow(row);
        transactions.push(transaction);
    });
    return transactions;
}

// const CSVFile = FS.readFileSync("./DodgyTransactions2015.csv", "utf8");
// const CSVFile = FS.readFileSync("./Transactions2014.csv", "utf8");
const JSONFile = FS.readFileSync("./Transactions2013.json", "utf8");
const transactions = ParseJSON.getTransactionsFromFile(JSONFile);
// console.log(rows);
console.log(transactions);

// const transactions = ParseCSV.getTransactionsFromFile(CSVFile);
// const supportBank = new SupportBank(transactions);
// const ModeListAllAccounts = "1";
// const ModeListAccountByName = "2";

// printWelcomeMessage();
// const viewMode = getAccountViewMode();
// if (viewMode == ModeListAllAccounts) {
//     supportBank.listAllAccounts();
// } else if (viewMode == ModeListAccountByName) {
//     const accountName = UserInput.getStringWithPrompt("Enter an Account Name");
//     supportBank.listAccountByName(accountName);
// }
