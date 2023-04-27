const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionId: {
        type: String,
        required: true
    },
    walletId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);