const mongoose = require('mongoose');
const Event = require('../models/eventModel');
const User = require('../models/userModel');


exports.addParticipant = async (req, res) => {
    const { eventId, userId } = req.body;
  
    try {
    
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.participants.length >= event.places) {
        return res.status(400).json({ message: 'Event is already full' });
      }
  
      
      if (event.participants.includes(userId)) {
        return res.status(400).json({ message: 'User is already a participant' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.role !== 'user') {
        return res.status(403).json({ message: 'Only users can be added as participants' });
      }
  
      event.participants.push(userId);
      await event.save();
  
      res.status(200).json({ message: 'Participant added successfully', event });
    } catch (err) {
      res.status(500).json({ message: 'Error adding participant', error: err });
    }
  };

