const mongoose = require('mongoose');
const { Schema } = mongoose;

const rideSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    source: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    destination: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    availableSeats: {
        type: Number,
        required: false
    }
    ,
    time: { type: Date, default: Date.now },
    otp: {
        type: Number,
    },
    commuter: {
        commuter_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'commuter_route',
        }

    }

});

rideSchema.index({ source: '2dsphere', destination: '2dsphere' });
const ride = mongoose.model('ride_route', driverSchema);

module.exports = ride;