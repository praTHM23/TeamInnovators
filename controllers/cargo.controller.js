const Cargo = require('../models/cargo.model');

// store new cargo route
exports.storeCargoRoute = async (req, res, next) => {
    const cargo = new Cargo({
        source: {
            type: 'Point',
            coordinates: [req.body.source.longitude, req.body.source.latitude],
        },
        destination: {
            type: 'Point',
            coordinates: [
                req.body.destination.longitude,
                req.body.destination.latitude,
            ],
        },
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