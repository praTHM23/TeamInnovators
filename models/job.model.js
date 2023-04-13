// const mongoose = require("mongoose");

// const Job = new mongoose.Schema(
//   {
//     UserID: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "user",
//     },
//     title: { type: String, required: true },
//     tags: { type: String, required: true },
//     Job_Description: { type: String, required: true },
//     // location: { type: String, required: true },
//     location: { type: String },
//     budget: { type: String },
//     photo_link: { type: String },
//     status: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Job", Job);

const mongoose = require('mongoose');

// const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'user'
  },
  start_date: {
    type: Date,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  },
  required_services: {
    type: [String],
    required: false
  },
  description: {
    type: String,
    required: false
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
      comment: {
        type: String,
        required: false
      }
    }
  ],
  assigned: {
    type: Boolean,
    required: true,
    default: false
  },
  assigned_to: {
    service_provider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: function () {
        return this.assigned === true;
      }
    },
    start_date: {
      type: Date,
      required: function () {
        return this.assigned === true;
      }
    },
    start_time: {
      type: String,
      required: function () {
        return this.assigned === true;
      }
    },
    end_date: {
      type: Date,
      required: function () {
        return this.assigned === true;
      }
    },
    budget: {
      type: Number,
      required: function () {
        return this.assigned === true;
      }
    },
    completed: {
      type: Boolean,
      default: null
    }
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
