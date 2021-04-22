import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import cors from 'cors';

import customerRoutes from './routes/customers.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);

dotenv.config({path: '.env'});
const CONN_URL = process.env.CONN_URL;
const PORT = process.env.PORT;

mongoose.connect(CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);