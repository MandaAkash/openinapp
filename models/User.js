const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    priority: {
      type: Number,
      enum: [0, 1, 2],
      required: true,
    },
    last_call_time:{
      type:Date,
      default:null
    },
    called: {
      type: Boolean,
      default: false // Indicates whether the user has been called previously
    }
  },
  { 
    timestamps: true,
    collection: 'userscollection' 
  }
);

module.exports = mongoose.model('User', userSchema);
