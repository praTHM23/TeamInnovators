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

  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  time: {
    type: String,
    required: true,

  },
  amount_offered: {
    type: String,
    required: true
  }
});

cargoSchema.index({ source: '2dsphere', destination: '2dsphere' });

const Cargo = mongoose.model('Cargo', cargoSchema);

module.exports = Cargo;