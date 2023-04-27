const Wallet = require('../model/Wallet');
const { v4: uuid } = require('uuid');

const createNewWallet = async (req, res) => {
    if (!req?.body?.name || !req?.body?.balance) {
        return res.status(400).json({ 'message': 'Wallet name and Balance are required' });
    }
    if (!(req.body.balance > 0)) {
        res.status(422).json({ messages: "Opening Balance can not be Negative" });
    }
    try {
        const result = await Wallet.create({
            walletId:uuid(),
            name: req.body.name,
            balance: req.body.balance
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



const fetchWalletById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Wallet ID required.' });
    try{
        
        const walletData = await Wallet.findOne({ walletId: req.params.id }).exec();
        if (!walletData) {
            return res.status(404).json({ "message": `No Wallet matches ID ${req.params.id}.` });
        }
            res.json(walletData); 
            
    } catch (err) {
        console.error(err);
    }
    
}

module.exports = {
    createNewWallet,
    fetchWalletById,
}