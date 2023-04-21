const Ride = require('../models/ride.Model');
const Commuter = require('../models/commuter.model')
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');
const { createClient } = require('@google/maps');
const geolib = require('geolib');
const S2 = require('s2-geometry').S2;
const googleMapsClient = createClient({
    key: 'AIzaSyA3VVKFZuS_LeyCLtLHJwsH9buwcCf69mE',
    Promise: Promise // Assuming you're using a version of Node.js that supports Promise
});

exports.createRide = async (req, res) => {
    console.log("hello from create rides\n")

    try {
        const userId = req.body.userId;
        const source = req.body.source;
        const destination = req.body.destination;
        const availableSeats = req.body.availableSeats;
        const time = req.body.time;
        const newRide = new Ride({
            userId,
            source,
            destination,
            availableSeats,
            time,

            // otp: null,
            // commuter: {}
        });
        const savedRide = await newRide.save();
        res.status(201).json({
            message: "Ride created successfully",
            data: {
                userId: savedRide.userId,
                source: savedRide.source,
                destination: savedRide.destination,
                availableSeats: savedRide.availableSeats,
                time: savedRide.time,
                completed: savedRide.completed
            }
        });
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: 'Error creating ride', error: err });
    }

}

exports.getrides = async (req, res) => {
    try {
        const rides = await Ride.find().populate('userId');
        res.json(rides);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving rides', error: err });
    }
}

exports.getridesForCommuter = async (req, res, next) => {
    const { source, destination } = req.body;

    // Get all rides that intersect the line between the source and destination
    const rides = await Ride.find({
        $or: [
            {
                source: {
                    $geoIntersects: {
                        $geometry: {
                            type: 'LineString',
                            coordinates: [source.coordinates, destination.coordinates]
                        }
                    }
                }
            },
            {
                destination: {
                    $geoIntersects: {
                        $geometry: {
                            type: 'LineString',
                            coordinates: [source.coordinates, destination.coordinates]
                        }
                    }
                }
            }
        ]
    }).populate('userId');

    res.json({ rides });
}



exports.getRidebyUserID = async (req, res, next) => {
    console.log(req.params.id)
    try {
        const ride = await Ride.findOne({
            UserId: req.params.id,
            completed: false
        }).populate('userId')
        res.status(200).json({
            message: "you have one active ride!",
            ride: ride
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "No active rides!"
        })
    }
};

exports.updateRideWithCommuter = async (req, res, next) => {

    const UserId = req.params.id;
    const commuterId = req.body.commuter_id;

    try {
        const ride_details = await Ride.findOne({
            UserId: req.params.id,
            completed: false
        })
        console.log(ride_details)
        const rideId = ride_details._id
        const ride = await Ride.findByIdAndUpdate(
            rideId,
            { $set: { commuter: { commuter_id: commuterId } } },
            { new: true }
        );
        const updateride = await Ride.findById(rideId).populate('userId commuter.commuter_id')
        res.status(200).json({ message: 'Ride updated successfully', ride: updateride });
    } catch (error) {
        next(error);
    }
};

// exports.generateRideOTP = async (req, res, next) => {
//     console.log("hello from otp")
//     console.log(req.params.id)
//     // const UserId = req.params.id;
//     const otp = Math.floor(Math.random() * 10000); // generate 4-digit OTP
//     const ride = await Ride.findById(req.params.id)
//     const commuter_id = ride.commuter.commuter_id;

//     const commuterDetails = await Commuter.findById(commuter_id).populate('userId');
//     try {

//         const ridId = req.params.id
//         const ride = await Ride.findByIdAndUpdate(
//             rideId,
//             { $set: { otp: otp } },
//             { new: true }
//         );
//         res.status(200).json({ message: 'OTP generated', otp: otp });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.verifyRideOTP = async (req, res, next) => {
//     const userId = req.params.id;
//     const otp = req.body.otp;

//     try {
//         const ride = await Ride.findById(req.params.id)
//         const commuter_id = ride.commuter.commuter_id;

//         const commuterDetails = await Commuter.findById(commuter_id).populate('userId');





//         // const ride = await Ride.findOne({
//         //     userId: req.params.id,
//         //     completed: false,
//         // })

//         // if (ride.otp !== otp) {
//         //     return res.status(401).json({ message: 'OTP verification failed' });
//         // }
//         // res.status(200).json({ message: 'OTP verified successfully' });
//     } catch (error) {
//         next(error);
//     }
// };