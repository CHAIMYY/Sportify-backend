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
  exports.updateEvent = async (req, res) => {
    try {
      const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updateEvent) return res.status(404).json({ message: 'event not found' });
      res.json(updateEvent);
    } catch (err) {
      res.status(500).json({ message: 'Error updating event', error: err });
    }
  };