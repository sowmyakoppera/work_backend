import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    sno: {
        type: Number,
        unique: true,
    },
    name_: String,
    phone: Number,
    // chitts: [String],
    chitts: [mongoose.Schema.Types.ObjectId],
    reference: String,
    // reference: mongoose.Schema.Types.ObjectId,
    note: [String],
    monthlyDet: Object,
    paid: [{
        amount: Number,
        paidOn: Date
    }],
    balance: [{
        amount: Number,
        month: Date //
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const customerDetails = mongoose.model('customerDetails', customerSchema);
export default customerDetails;