const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    walletId: {
        type: String,
        required: true
    },
    name: {
        type: String,
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

module.exports = mongoose.model('Wallet', walletSchema);