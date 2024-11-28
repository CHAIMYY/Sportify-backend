const User = require('../models/userModel');
const {register} = require('../controllers/authController');
const {login} = require('../controllers/authController');

jest.mock('../models/userModel')

describe('auth testing',()=>{

it('Should register a new user', async ()=>{

const req = {
body:{
 firstname:"test",
 lastname:"test",
 email:"test",
 password:"test",
 role:['test','test']

}
}

const savedMock = jest.fn().mockResolvedValue({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    password:req.body.password,
    role:req.body.role

})
User.mockReturnValue({save: savedMock})
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
}

await register(req, res)
    expect(User).toHaveBeenCalledTimes(1)
    expect(User).toHaveBeenCalledWith({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })

})


it('Should log in users', async () => {
    const req = {
      body: {
        email: "test",
        password: "test"
      }
    };
  
    
    User.findOne = jest.fn().mockResolvedValue({
      email: req.body.email,
      firstname: "TestFirst",
      lastname: "TestLast",
      _id: "mockedUserId",
      comparePassword: jest.fn().mockReturnValue(true), 
    });
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    await login(req, res);
  
   
    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String) 
    });
  });
  


})

