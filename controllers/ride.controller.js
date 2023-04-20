const Ride = require('../models/ride.Model');
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');


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

// exports.getridesForCommuter = async (req, res) => {
//     console.log("hello")
//     const commuterSource = req.query.source; // e.g. [40.7128, -74.0060]
//     const commuterDestination = req.query.destination; // e.g. [41.8781, -87.6298]

//     try {
//         // Convert commuter source and destination points to GeoJSON
//         const sourceGeojson = turf.point(commuterSource);
//         const destinationGeojson = turf.point(commuterDestination);

//         // Create a LineString feature for the line connecting the commuter's source and destination points
//         const commuterRoute = turf.lineString([sourceGeojson.geometry.coordinates, destinationGeojson.geometry.coordinates]);

//         // Find all rides where the driver's route intersects the line connecting the commuter's source and destination points
//         const rides = await Ride.find({
//             $or: [
//                 {
//                     source: {
//                         $geoIntersects: {
//                             $geometry: commuterRoute
//                         }
//                     }
//                 },
//                 {
//                     destination: {
//                         $geoIntersects: {
//                             $geometry: commuterRoute
//                         }
//                     }
//                 }
//             ]
//         });

//         // Filter rides based on whether the driver's route intersects the line connecting the commuter's source and destination points
//         const filteredRides = rides.filter(ride => {
//             const rideLineString = turf.lineString([ride.source.coordinates, ride.destination.coordinates]);
//             return turf.booleanCrosses(rideLineString, commuterRoute);
//         });

//         res.json(filteredRides);
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: 'Error retrieving rides', error: err });
//     }
// }