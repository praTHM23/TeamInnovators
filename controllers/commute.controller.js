const Commuter = require('../models/commuter.model');

exports.createCommuter = async (req, res, next) => {

    console.log("Hello from create commute")
    try {
        const { userId, c_source, c_destination, amount_offered } = req.body;

        const newCommuter = new Commuter({
            userId,
            c_source,
            c_destination,
            amount_offered,
        });

        const savedCommuter = await newCommuter.save();

        res.status(201).json({
            message: 'Commuter route created successfully',
            commuter: savedCommuter,
        });
    } catch (error) {
        next(error);
    }
};


exports.getAllCommute = async (req, res) => {
    try {
        const rides = await Commuter.find().populate('userId');
        res.json(rides);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving rides', error: err });
    }
}
