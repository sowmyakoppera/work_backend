import express from "express";
import chittDetails from '../models/chittDetails.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/',async ( req, res ) => {
    try {
        const chitts = await chittDetails.find().sort({startedOn: -1,amount: -1});
        // console.log(`chittS-${chitts}-chittS`);
        res.status(200).json(chitts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});
router.get('/:code', async (req,res) => {
    const { code } = req.params;
    const chitt = await chittDetails.findById(code);
    console.log(`chitt-${chitt}-chitt`);
    res.status(200).json(chitt);
});
router.post('/', async (req, res) => {
    const { amount, startedOn, monthlyBeat, paymentTo, note } = req.body;
    
    var monthlyAmount = new Array();
    var monthlyCommission = new Array();

    // get values of commission and total amount
    if( monthlyBeat.length > 0){
        for (var i = 0; i < monthlyBeat.length; i++){
            monthlyCommission[i] = (monthlyBeat[i] -(0.04 * amount))/20;
            monthlyAmount[i] = ( (amount/20) - monthlyCommission[i] );
        }  
    }
    const newChitt = new chittDetails({ amount, startedOn, monthlyBeat, monthlyCommission, monthlyAmount, paymentTo, note })
    console.log( `new------------- chitt created \n\n\n - ${newChitt} \n\n\n` );

    try {
        await newChitt.save();
        console.log( `new chitt created \n\n\n - ${newChitt} \n\n\n` );
        res.status(200).json( newChitt );
    } catch (error) {
        console.log(`\n\n\nerror: ${error}\n\n\n`);
        res.status(405).json({message: error.message})
    }
});



router.post('/:id', async (req,res) => {
    const { id } = req.params;
    const { active, amount, startedOn, monthlyBeat, paymentTo, note } = req.body;
    console.log(`updated - ${req.body.amount}`);
    var monthlyAmount = new Array();
    var monthlyCommission = new Array();

    if( monthlyBeat.length > 0){
        for (var i = 0; i < monthlyBeat.length; i++){
            monthlyCommission[i] = (monthlyBeat[i] -(0.04 * amount))/20;
            monthlyAmount[i] = ( (amount/20) - monthlyCommission[i] );
        }  
    }

    try{
        console.log('\n\n\n\n\n\nid');
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)){
            console.log('this id is not available');
            return res.status(404).send(`No post with id: ${id}`);
        }
        console.log('\n\n\n\n\n\n');
        
        const updatedChitt = { active, amount, startedOn, monthlyBeat, monthlyCommission, monthlyAmount, paymentTo, note , _id: id };
        await chittDetails.findByIdAndUpdate(id, updatedChitt, { new: true });
        console.log('\n\n\n\n\n\nnupdatedChitt---------------------------------------------------------------------------------------------------------');
        console.log(updatedChitt);
        console.log('updatedChitt---------------------------------------------------------------------------------------------------------\n\n\n\n\n\n\n');

        res.json(updatedChitt);
    } catch (error) {
        console.log('\n\n\n\n\n\nid');
        console.log('errorr:');
        console.log(error);
        console.log('\n\n\n\n\n\n');
        res.status(405).json({message: error.message})
    }
  });

export default router;