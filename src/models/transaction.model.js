const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const User = require('./user.model')

const operations = ['deposit', 'withdrawal', 'investment', 'investmentwithdrawal'];

const transactionSchema = new mongoose.Schema({
    operation: {
        type: String,
        required: true,
        enum: operations,
    },
    accountNumber: {
        type: 'Number',
        ref: 'User',
        required: true,
    },
    IFSC: {
        type: String
    },
    destinationAccountNumber: {
        type: 'Number',
        ref: 'User',
    },
    destinationIFSC: {
        type: String
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
    },
    reference: {
        type: String,
    },
}, {
    timestamps: true,
});

transactionSchema.pre('save', async function save(next) {
    this.wasNew = this.isNew;
    return next();
});

transactionSchema.post('save', async function save(doc, next) {
    try {
        if (this.wasNew && (this.operation === 'deposit' || this.operation === 'investmentwithdrawal')) {
            const currentUser = await User.findOne({ 'bankAccountNo': this.accountNumber });
            currentUser.balance += this.amount;
            currentUser.balance = currentUser.balance.toFixed(2);
            const savedUser = await currentUser.save();
        }

        if (this.wasNew && (this.operation === 'withdrawal' || this.operation === 'investment')) {
            const currentUser = await User.findOne({ 'bankAccountNo': this.accountNumber });
            currentUser.balance -= this.amount;
            currentUser.balance = currentUser.balance.toFixed(2);
            const savedUser = await currentUser.save();
        }

        return next();
    } catch (error) {
        return next(error);
    }
});

transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;