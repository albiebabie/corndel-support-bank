const Transaction = require("./transaction");
const Account = require("./account");

function getTransactionsFromFile(file) {
    let rows = getRowsFromFile(file);
    return createTransactionsFromRows(rows);
}

function getRowsFromFile(file) {
    let fileSplitIntoStrings = file.split("\n");
    let validRows = [];
    const columnHeadersRowIndex = 0;
    fileSplitIntoStrings.forEach(string => {
        var row = string.split(",");
        if (hasCorrectNumberOfColumns(row) && fileSplitIntoStrings.indexOf(string) != columnHeadersRowIndex) {
            validRows.push(row);
        }
    });
    return validRows;
}

function hasCorrectNumberOfColumns(row) {
    const correctNumberOfColumns = 5;
    return row.length === correctNumberOfColumns;
}

function createTransactionsFromRows(rows) {
    let transactions = [];
    rows.forEach(row => {
        const transaction = Transaction.createFromRow(row);
        transactions.push(transaction);
    });
    return transactions;
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

exports.getTransactionsFromFile = getTransactionsFromFile;
exports.createAccountsFromTransactions = createAccountsFromTransactions;
