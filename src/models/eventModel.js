const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
    duration: {
      type: String,
      required: true,
    },
   
    places: {
      type: Number,
      required: true,
    },
  

  }, {
    timestamps: true, 
  });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;