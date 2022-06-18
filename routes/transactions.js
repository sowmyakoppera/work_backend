import express from "express";
import transactionDetails from '../models/transactionDetails.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/',async ( req, res ) => {
    try {
        const transactions = await transactionDetails.find();
        console.log(`transactionS-${transactions}-transactionS`);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});
router.get('/:id', async (req,res) => {
    console.log('req.params++');
    console.log('req.params++');
    const { id } = req.params;
    try {
        console.log('req.params++');
        const transaction = await transactionDetails.findById(id);
        console.log('req.params++');
        console.log(req.params);
        console.log(`transaction-${transaction}-transaction`);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});
router.post('/', async (req, res) => {
    const { amount,from,date,to,type,note } = req.body;
    const newTransaction = new transactionDetails({ amount,from,date,to,type,note })

    try {
        await newTransaction.save();
        console.log( `new transaction created - ${newTransaction}` );
        res.status(200).json( {status:true} );
    } catch (error) {
        res.status(405).json({message: error.message})
    }
});


router.post('/:id', async (req,res) => {
    const { id } = req.params;
    const { amount,from,date,to,type,note } = req.body;
    
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const updatedPost = { amount,from,date,to,type,note, _id: id };

        await transactionDetails.findByIdAndUpdate(id, updatedPost, { new: true });
        console.log('\nupdated');
        res.json(updatedPost);
    } catch (error) {
        res.status(405).json({message: error.message})
    }
  });

export default router;