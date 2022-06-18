import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import customersRoute from './routes/customers.js';
import chittsRoute from './routes/chitts.js';
import transactionsRoute from './routes/transactions.js';
import activityRoute from './routes/activity.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/',activityRoute);
app.use('/customers',customersRoute);
app.use('/chitts',chittsRoute);
app.use('/transactions',transactionsRoute);


const CONNECTION_URL = 'mongodb://business:business@cluster0-shard-00-00.31z6l.mongodb.net:27017,cluster0-shard-00-01.31z6l.mongodb.net:27017,cluster0-shard-00-02.31z6l.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1fwx7u-shard-0&authSource=admin&retryWrites=true&w=majority';
// const CONNECTION_URL = 'mongodb+srv://business:business@cluster0.31z6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(`Startssssssssss\n\n${error.message}\n\nEndsssss`));
  
// mongoose.set('useFindAndModify', false);