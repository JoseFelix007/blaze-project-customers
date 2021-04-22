import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number
});

const Customer = mongoose.model('CustomerSchema', customerSchema);

export default Customer;