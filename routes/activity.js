import express from "express";
import customerDetails from '../models/customerDetails.js';

const router = express.Router();

router.get('/',async ( req, res ) => {
    try {
        const customers = await customerDetails.find();
        console.log(`customerS-${customers}-customerS`);
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

export default router;