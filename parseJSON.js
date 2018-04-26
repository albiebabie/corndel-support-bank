const Transaction = require("./transaction");

function getTransactionsFromFile(file) {
    const rows = getRowsFromFile(file);
    let transactions = [];
    rows.forEach(row => {
        const transaction = Transaction.createFromJSONRow(row);
        transactions.push(transaction);
    });
    return transactions;
}

function getRowsFromFile(file) {
    return JSON.parse(file);
}

exports.getTransactionsFromFile = getTransactionsFromFile;
