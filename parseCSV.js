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
        const transaction = Transaction.createFromCSVRow(row);
        transactions.push(transaction);
    });
    return transactions;
}

exports.getTransactionsFromFile = getTransactionsFromFile;
