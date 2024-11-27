const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');
const inscriptionController = require('../controllers/inscriptionController');
const { authenticateJWT, isOrganisateur }  = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.send('Welcome to the Sportify Backend!');
});

router.post('/register', authController.register);
router.post('/login', authController.login);


// event curd 

router.post('/api/event/create',authenticateJWT,isOrganisateur, eventController.createEvent);
router.get('/api/event/getevents',authenticateJWT,eventController.getevents);
router.put('/api/event/editEvent/:id',authenticateJWT ,isOrganisateur,eventController.updateEvent);
router.delete('/api/event/deleteEvent/:id',authenticateJWT,isOrganisateur,eventController.deleteEvent);


// inscription crud

router.post('/events/:id/add-participant',authenticateJWT,isOrganisateur, inscriptionController.addParticipant);

module.exports = router;
