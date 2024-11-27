const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app'); 
const Event = require('../models/eventModel');

// Mock Event model
jest.mock('../models/eventModel');

describe('Event Controller', () => {
  describe('createEvent', () => {
    it('should create a new event and return 201 status', async () => {
      // Mock the save method
      Event.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({ _id: '123', name: 'Test Event' }),
      }));

      // Make a request
      const response = await request(app)
        .post('/api/event/create') // Replace with your actual route
        .send({ name: 'Test Event' });

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ _id: '123', name: 'Test Event' });
    });

    it('should return 500 if there is an error', async () => {
      // Mock the save method to throw an error
      Event.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Database Error')),
      }));

      // Make a request
      const response = await request(app).post('/api/events').send({ name: 'Test Event' });

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error creating event');
    });
  });
});
