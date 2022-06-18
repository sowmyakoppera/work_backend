import mongoose from 'mongoose';

const chittSchema = mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },
    amount: Number,
    startedOn: {
        type: Date,
        default: new Date('2022-01-10'),
    },
    monthlyBeat: [{
        type: Number,
        default: 0,
        
    }],
    monthlyCommission: [{
        type: Number,
        default: 0  
    }],
    monthlyAmount: [{
        type: Number,
        default: 0
    }],
    paymentTo: [String],
    note: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const chittDetails = mongoose.model('chittDetails', chittSchema);
export default chittDetails;