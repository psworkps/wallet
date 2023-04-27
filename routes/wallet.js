const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const transactionController = require('../controllers/transactionController');

router.route('/')
    .post(walletController.createNewWallet);

router.route('/:id')
    .get(walletController.fetchWalletById);


router.route('/:id/transactions')
    .get(transactionController.fetchTransactionsForWallet)
    .post(transactionController.createTransaction);


module.exports = router;