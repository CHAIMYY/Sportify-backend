const mongoose = require('mongoose');
const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ message: 'Error creating event', error: err });
    }
  };

  exports.getevents = async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching events', error: err });
    }
  };
