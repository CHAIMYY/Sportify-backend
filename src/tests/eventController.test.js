const Event = require('../models/eventModel'); 
const {createEvent} = require('../controllers/eventController.js')
const {deleteEvent} = require('../controllers/eventController.js')
const {updateEvent} = require('../controllers/eventController.js');
const {getevents} = require('../controllers/eventController.js');
const { findByIdAndUpdate } = require('../models/userModel');
jest.mock('../models/eventModel')

describe('Event testing', () => {

  it('should create a new event', async () => {
    const req = {
      body: {
        title: 'test',
        description: 'test', 
        duration: 'test',
        places: 4,
        participants: ['test', 'test']
      }
    }

    const savedMock = jest.fn().mockResolvedValue({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      places: req.body.places,
      participants: req.body.participants
    })
    Event.mockReturnValue({save: savedMock})
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await createEvent(req, res)
    expect(Event).toHaveBeenCalledTimes(1)
    expect(Event).toHaveBeenCalledWith({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      places: req.body.places,
      participants: req.body.participants
    })
  })

  it('should call method of delete an event', async () => {
    const req = {
      params: {
        id: 'test'
      }
    }
    const deleteMock = jest.fn().mockResolvedValue({
      _id: req.params.id
    })

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    Event.findByIdAndDelete = deleteMock;
    await deleteEvent(req, res)
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith(req.params.id);
    expect(res.status).not.toHaveBeenCalledWith(404); 
    expect(res.json).toHaveBeenCalledWith({
      message: 'event deleted',
      event: { _id: req.params.id },
    });
  } )

  it("should call method of update an event", async () => {
    const req = {
      body: {
        title: 'test',
        description: 'test', 
        duration: 'test',
        places: 4,
        participants: ['test', 'test']
      },
        params: {
          id: 'test'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      const updateMock = jest.fn().mockRejectedValue(new Error('Database error'));
      Event.findByIdAndUpdate = updateMock;

      await updateEvent(req, res);

      expect(updateMock).toHaveBeenCalledWith(req.params.id, req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error updating event',
        error: expect.any(Error),
      });
  })

  it('should call method of getting events', async() => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const mockEvents = [
      { _id: '1',  title: 'test',
        description: 'test', 
        duration: 'test',
        places: 4,
        participants: ['test', 'test'] },
    ];

    const findMock = jest.fn().mockResolvedValue(mockEvents);
    Event.find = findMock
    await getevents(req, res)
    expect(findMock).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled(); 
    expect(res.json).toHaveBeenCalledWith(mockEvents);
  })
} )