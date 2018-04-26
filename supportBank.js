const Account = require("./account");

class SupportBank {
    constructor(transactions) {
        this.transactions = transactions;
        this.accounts = [];
        this.createAccounts();
    }

    createAccounts() {
        this.transactions.forEach(transaction => {
            let toAccount = this.getOrCreateAccount(transaction.to);
            toAccount.owed.push(transaction);
            let fromAccount = this.getOrCreateAccount(transaction.from);
            fromAccount.owes.push(transaction);
        });
    }

    getOrCreateAccount(name) {
        let account = this.findAccount(name);
        if (!account) {
            account = new Account(name);
            this.accounts.push(account);
        }
        return account;
    }

    findAccount(name) {
        for (let i = 0; i < this.accounts.length; i++) {
            let account = this.accounts[i];
            if (account.name == name) {
                return account;
            }
        }
    }

    listAllAccounts() {
        console.log("\nAccounts: \n");
        this.accounts.forEach(account => {
            account.displayAccountOverview();
        });
    }

    listAccountByName(name) {
        let account = this.findAccount(name);
        if (account) {
            account.displayAccountInfo();
        } else {
            console.log("Account by the Name: '" + name + "' does not exist!");
        }
    }
}

module.exports = SupportBank;
