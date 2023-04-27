const Transaction = require('../model/Transaction');
const Wallet = require('../model/Wallet');
const { v4: uuid } = require('uuid');

// Depositing and withdrawing from wallet
const createTransaction = async (req, res) => {
    if (!req?.body?.amount) {
        return res.status(400).json({ 'message': 'Amount is required' });
    }
    try {
        const walletData = await Wallet.findOne({ walletId: req.params.id }).exec();
        if (!walletData) {
            return res.status(404).json({ "message": `No Wallet matches ID ${req.params.id}.` });
        }

        let newBalance = walletData.balance + req.body.amount;

        if(!(newBalance >= 0)){
            return res.status(400).json({ 'message': 'Not enough banalance in Wallet' });

        }
        // create wallet transaction
        const result = await Transaction.create({
            transactionId: uuid(),
            walletId: req.params.id,
            amount: req.body.amount,
            description: req.body.description,
            balance: newBalance

        });
        // update the balance in wallet
        walletData.balance = newBalance;
        await walletData.save();

        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

// Transactions List by Wallet Id
const fetchTransactionsForWallet = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'Wallet id is required' });
    }
    try {
        const TransactionData = await Transaction.find({ walletId: req.params.id }).exec();
        if (!TransactionData) {
            return res.status(404).json({ "message": `No Wallet matches ID ${req.params.id}.` });
        }

        res.status(200).json(TransactionData);

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    createTransaction,
    fetchTransactionsForWallet
}