const mongoose = require('mongoose');
const Event = require('../models/eventModel');
const User = require('../models/userModel');


exports.addParticipants = async (req, res) => {
  const { eventId, userIds } = req.body; 

  try {
    
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const addedParticipants = [];
    const errors = [];

    for (const userId of userIds) {
      try {
      
        if (event.participants.length >= event.places) {
          errors.push({ userId, message: 'Event is already full' });
          continue;
        }


        if (event.participants.includes(userId)) {
          errors.push({ userId, message: 'User is already a participant' });
          continue;
        }

        
        const user = await User.findById(userId);
        if (!user) {
          errors.push({ userId, message: 'User not found' });
          continue;
        }

        
        if (user.role !== 'participant') {
          errors.push({ userId, message: 'Only users can be added as participants' });
          continue;
        }

        
        event.participants.push(userId);
        addedParticipants.push(userId);
      } catch (err) {
        errors.push({ userId, message: 'Error adding participant', error: err.message });
      }
    }

  
    if (addedParticipants.length > 0) {
      await event.save();
    }

    res.status(200).json({
      message: `${addedParticipants.length} participants added successfully`,
      addedParticipants,
      errors,
      event,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding participants', error: err.message });
  }
};
