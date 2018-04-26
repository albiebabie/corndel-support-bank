class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = amount;
    }

    static createFromRow(row) {
        var date = row[0];
        var from = row[1];
        var to = row[2];
        var narrative = row[3];
        var amount = row[4];
        return new Transaction(date, from, to, narrative, amount);
    }

    print() {
        console.log("Date: " + this.date);
        console.log("From: " + this.from);
        console.log("To: " + this.to);
        console.log("Narrative: " + this.narrative);
        console.log("Amount: £" + this.amount + "\n");
    }
}

module.exports = Transaction;
