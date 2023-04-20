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
    time: { type: String, required: true },
    otp: {
        type: Number,
        default: null,
        required: false
    },
    commuter: {
        commuter_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'commuter_route',
            required: false
        },

    }

});

rideSchema.index({ source: '2dsphere', destination: '2dsphere' });
const ride = mongoose.model('ride_route', rideSchema);

module.exports = ride;