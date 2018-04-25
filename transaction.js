class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = amount;
    }

    static createFromRowArray(transactionArray) {
        var date = transactionArray[0];
        var from = transactionArray[1];
        var to = transactionArray[2];
        var narrative = transactionArray[3];
        var amount = transactionArray[4];
        return new Transaction(date, from, to, narrative, amount);
    }
}

module.exports = Transaction;
