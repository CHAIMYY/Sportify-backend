const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');
const inscriptionController = require('../controllers/inscriptionController');

router.get('/', (req, res) => {
    res.send('Welcome to the Sportify Backend!');
});

router.post('/register', authController.register);
router.post('/login', authController.login);


// event curd 

router.post('/api/event/create', eventController.createEvent);
router.get('/api/event/getevents',eventController.getevents);
router.put('/api/event/editEvent/:id',eventController.updateEvent);
router.delete('/api/event/deleteEvent/:id',eventController.deleteEvent);


// inscription crud

router.post('/events/:id/add-participant',authenticateJWT,isOrganisateur, inscriptionController.addParticipants);

module.exports = router;
