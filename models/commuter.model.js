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
        },
        add_source: {
            type: String,
            required: false,
            default: ""
        },
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
        },
        add_destination: {
            type: String,
            required: false,
            default: ""
        },

    },
    amount_offered: {
        type: String,
        require: true,
    },

    time: { type: String, default: "" },

});

commuterSchema.index({ source: '2dsphere', destination: '2dsphere' });
const commuter = mongoose.model('commuter_route', commuterSchema);

module.exports = commuter;