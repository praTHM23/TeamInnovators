const Cargo = require('../models/cargo');

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
        photo: req.body.photo,
    });

    try {
        const savedCargo = await cargo.save();
        res.status(201).json({ message: 'Cargo route stored', cargo: savedCargo });
    } catch (error) {
        next(error);
    }
};