class Account {
    constructor(name) {
        this.name = name;
        this.owes = [];
        this.owed = [];
    }

    balance() {
        let balance = 0;
        this.owes.forEach(transaction => {
            balance += parseInt(transaction.amount);
        });
        this.owed.forEach(transaction => {
            balance -= parseInt(transaction.amount);
        });
        return balance;
    }

    displayBalance() {
        let balance = this.balance();
        if (balance > 0) {
            return `You are owed: £${balance}, better get collecting!`;
        }
        if (balance < 0) {
            return `You owe: £${Math.abs(balance)}, keep a low profile!`;
        }
        if (balance == 0) {
            return `You don't owe anyone and you aren't owed!`;
        }
    }

    displayAccountInfo() {
        console.log("Account: " + this.name);
        console.log("______Owes Transactions______");
        this.printTransactions(this.owes);
        console.log("______Owed Transactions______");
        this.printTransactions(this.owed);
    }

    displayAccountOverview() {
        console.log(this.name);
        console.log("-------------");
        console.log(this.displayBalance() + "\n");
    }

    printTransactions(transactions) {
        transactions.forEach(transaction => {
            transaction.print();
        });
    }
}

module.exports = Account;
