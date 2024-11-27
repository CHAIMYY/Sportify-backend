const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const authenticateJWT = async (req, res, next) => {
  try {
   
    const authHeader = req.header('Authorization');
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       
        return res.status(401).send({ error: 'Authorization token missing or invalid.' });
    }
    
    const token = authHeader.replace('Bearer ', '');
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'RESTFULAPIs');
    
    const user = await userModel.findOne({ _id: decoded._id});

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const isOrganisateur = (req, res, next) => {
  if (req.user.role !== 'organisateur') {
    return res.status(403).send({ error: 'not authorized.' });
  }
  next();
};

module.exports = { authenticateJWT, isOrganisateur };
