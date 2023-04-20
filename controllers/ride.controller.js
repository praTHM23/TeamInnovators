const Ride = require('../models/ride.Model');
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');
const { createClient } = require('@google/maps');


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
    // console.log("hello")
    // const { source, destination } = req.body;

    // try {
    //     // Use Google Maps Directions API to calculate the route and retrieve the polyline
    //     const response = await googleMapsClient.directions({
    //         origin: `${source.latitude},${source.longitude}`,
    //         destination: `${destination.latitude},${destination.longitude}`,
    //         mode: 'driving' // or 'bicycling', 'walking', etc.
    //     }).asPromise();

    //     // Decode the polyline to get an array of coordinates
    //     const polylineCoords = polyline.decode(response.json.routes[0].overview_polyline.points);

    //     // Find all rides where the driver's coordinates fall between the polyline coordinates
    //     const matchingRides = await Ride.find({
    //         $and: polylineCoords.map(coord => ({
    //             'driver.source.latitude': { $lte: coord[0] },
    //             'driver.source.longitude': { $lte: coord[1] },
    //             'driver.destination.latitude': { $gte: coord[0] },
    //             'driver.destination.longitude': { $gte: coord[1] }
    //         }))
    //     });

    //     res.json(matchingRides);
    // } catch (error) {
    //     console.error(error); // log the error for debugging purposes
    //     res.status(500).json({ message: 'An error occurred while processing your request.' });
    // }
}



