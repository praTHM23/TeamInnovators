const Cargo = require('../models/cargo.model');

// store new cargo route
exports.storeCargoRoute = async (req, res, next) => {
    const source = req.body.source;
    const destination = req.body.destination
    const cargo = new Cargo({
        source,
        destination,
        time: req.body.time,
        amount_offered: req.body.amount_offered
    });

    try {
        const savedCargo = await cargo.save();
        res.status(201).json({ message: 'Cargo route stored', cargo: savedCargo });
    } catch (error) {
        next(error);
    }
};