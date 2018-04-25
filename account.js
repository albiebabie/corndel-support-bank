class Account {
    constructor(name, owes, owed) {
        this.name = name;
        this.owes = owes;
        this.owed = owed;
        this.balance = 0;
        owes.forEach(transaction => {
            this.balance += +transaction.amount;
        });
        owed.forEach(transaction => {
            this.balance -= +transaction.amount;
        });
    }

    displayBalance() {
        if (this.balance > 0) {
            return `You are owed: £${this.balance}, better get collecting!`;
        }
        if (this.balance < 0) {
            return `You owe: £${this.balance}, keep a low profile!`;
        }
        if (this.balance == 0) {
            return `You don't owe anyone and you aren't owed!`;
        }
    }
}

module.exports = Account;
