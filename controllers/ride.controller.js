const Ride = require('../models/ride.Model');
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
    const userId = req.body.userId;
    const source = req.body.source;
    const destination = req.body.destination;
    const availableSeats = req.body.availableSeats;
    const time = req.body.time;

    try {
        const newRide = new Ride({
            userId,
            source,
            destination,
            availableSeats,
            time
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
                time: savedRide.time
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



