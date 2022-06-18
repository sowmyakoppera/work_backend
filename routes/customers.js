import express from "express";
import customerDetails from '../models/customerDetails.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/',async ( req, res ) => {
    try {
        const customers = await customerDetails.find().sort({sno:1});
        console.log(req.params);
        console.log(`customerS-${customers}-customerS`);
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const customer = await customerDetails.findById(id);
        // console.log(`customer-${customer}-customer`);
        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.post('/', async (req, res) => {
    const { sno, name_, phone, monthlyDet, chitts, transactions, reference, note } = req.body;
    const newCustomer = new customerDetails({ sno, name_, phone, monthlyDet, chitts, transactions, reference, note })

    try {
        await newCustomer.save();
        console.log( `new customer created - ${newCustomer}` );
        res.status(200).json( newCustomer );
    } catch (error) {
        res.status(405).json({message: error.message})
    }
});


router.post('/:id', async (req,res) => {
    const { id } = req.params;
    console.log('req.params++---------');
    console.log(req.params);
    console.log(req.body.name_);
    
    const { sno, name_, phone, monthlyDet, chitts, transactions, reference, note } = req.body;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(console.log('no data'));
        const updatedPost = { sno, name_, phone, monthlyDet, chitts, transactions, reference, note , _id: id };
        console.log('updatedPost');
        console.log(updatedPost);
        await customerDetails.findByIdAndUpdate(id, updatedPost, { new: true });
        console.log('\nupdated');
        res.json(updatedPost);
    } catch (error) {
        res.status(405).json({message: error.message})
        console.log(error)
    }
  });

export default router;