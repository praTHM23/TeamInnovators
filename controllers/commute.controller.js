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


exports.getcommuterById = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const commuterId = req.params.id;
        const commuter = await Commuter.findOne({ _id: commuterId }).populate('userId');

        if (!commuter) {
            // return a 404 error if the commuter is not found
            return res.status(404).json({ message: 'Commuter not found' });
        }

        // return the commuter document if found
        res.status(200).json({ commuter });
    } catch (error) {
        // handle any errors that may occur
        next(error);
    }
}