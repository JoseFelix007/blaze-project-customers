import Customer from '../models/customer.js';

export const getAll = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ message: `Se listan ${customers.length} cliente(s)`, data: customers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json({ message: `Se encontró al cliente con id ${req.params.id}`, data: customer });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const add = async (req, res) => {
    const addCustomer = new Customer(req.body);
    try {
        await addCustomer.save();
        res.status(201).json({ message: `Se ha añadido un cliente`, data: addCustomer });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const updateCustomer = await Customer.findById(req.params.id);

        updateCustomer.firstName   = req.body.firstName
        updateCustomer.lastName    = req.body.lastName
        updateCustomer.email       = req.body.email
        updateCustomer.phoneNumber = req.body.phoneNumber

        await updateCustomer.save();
        res.status(200).json({ message: `Se actualizó al cliente con id ${req.params.id}`, data: updateCustomer });
    } catch (error) {
        res.status(404).json({ message: `No se encontró al cliente con id ${req.params.id}`});
    }
}

export const remove = async (req, res) => {
    try {
        await Customer.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: `Se eliminó al cliente con id ${req.params.id}` });
    } catch (error) {
        res.status(404).json({ message: `No se encontró al cliente con id ${req.params.id}`});
    }
}