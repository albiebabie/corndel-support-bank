const FS = require("fs");
const Account = require("./account");
const UserInput = require("./userInput");
const ParseCSV = require("./parseCSV");
const SupportBank = require("./supportBank");

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

const CSVFile = FS.readFileSync("./DodgyTransactions2015.csv", "utf8");
// const CSVFile = FS.readFileSync("./Transactions2014.csv", "utf8");
const transactions = ParseCSV.getTransactionsFromFile(CSVFile);
const supportBank = new SupportBank(transactions);
const ModeListAllAccounts = "1";
const ModeListAccountByName = "2";

printWelcomeMessage();
const viewMode = getAccountViewMode();
if (viewMode == ModeListAllAccounts) {
    supportBank.listAllAccounts();
} else if (viewMode == ModeListAccountByName) {
    const accountName = UserInput.getStringWithPrompt("Enter an Account Name");
    supportBank.listAccountByName(accountName);
}
