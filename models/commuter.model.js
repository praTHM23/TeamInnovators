const mongoose = require('mongoose');
const { Schema } = mongoose;

const commuterSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    c_source: {
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
    c_destination: {
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
    amount_offered: {
        type: Number,
        require: true,
    },

    time: { type: Date, default: Date.now },

});

commuterSchema.index({ source: '2dsphere', destination: '2dsphere' });
const commuter = mongoose.model('commuter_route', commuterSchema);

module.exports = commuter;