const Account = require("./account");

class SupportBank {
    constructor(transactions) {
        this.transactions = transactions;
        this.accounts = [];
        this.createAccounts();
    }

    createAccounts() {
        this.transactions.forEach(transaction => {
            let from = transaction.from;
            let to = transaction.to;
            if (this.accountExists(from) == false) {
                let account = this.createAccountFromTransaction(transaction);
                this.accounts.push(account);
            }
            if (this.accountExists(to) == false) {
                let account = this.createAccountToTransaction(transaction);
                this.accounts.push(account);
            }
        });
    }

    createAccountFromTransaction(transaction) {
        let transactionsFrom = this.getListOfTransactionsFrom(transaction.from);
        let transactionsTo = this.getListOfTransactionsTo(transaction.from);
        return new Account(transaction.from, transactionsFrom, transactionsTo);
    }

    createAccountToTransaction(transaction) {
        let transactionsFrom = this.getListOfTransactionsFrom(transaction.from);
        let transactionsTo = this.getListOfTransactionsTo(transaction.from);
        return new Account(transaction.to, transactionsFrom, transactionsTo);
    }

    accountExists(name) {
        let accountExists = false;
        for (let i = 0; i < this.accounts.length; i++) {
            let account = this.accounts[i];
            if (account.name == name) {
                accountExists = true;
                break;
            }
        }
        return accountExists;
    }

    getListOfTransactionsFrom(name) {
        return this.transactions.filter(transaction => transaction.from == name);
    }

    getListOfTransactionsTo(name) {
        return this.transactions.filter(transaction => transaction.to == name);
    }

    listAllAccounts() {
        console.log("\nAccounts: \n");
        this.accounts.forEach(account => {
            console.log(account.name);
            console.log("-------------");
            console.log(account.displayBalance() + "\n");
        });
    }

    listAccountByName(name) {
        console.log(`Account: ${name}`);
        console.log("Transactions: ");
        const account = this.accounts.filter(account => account.name === name)[0];
        const owesTransactions = account.owes;
        console.log("______Owes Transactions______");
        this.printTransactions(owesTransactions);
        const owedTransactions = account.owed;
        console.log("______Owed Transactions______");
        this.printTransactions(owedTransactions);
    }

    printTransactions() {
        this.transactions.forEach(transaction => {
            transaction.print();
        });
    }
}

module.exports = SupportBank;
