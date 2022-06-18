import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    amount: Number,
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: new Date(),
    },
    type: String,
    note: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const transactionDetails = mongoose.model('transactionDetails', transactionSchema);
export default transactionDetails;