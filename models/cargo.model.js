const mongoose = require('mongoose');
const { Schema } = mongoose;

const cargoSchema = new Schema({
  source: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  destination: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  photo: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

cargoSchema.index({ source: '2dsphere', destination: '2dsphere' });

const Cargo = mongoose.model('Cargo', cargoSchema);

module.exports = Cargo;