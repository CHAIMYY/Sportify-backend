const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = async function (req, res) {
  try {
    const newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

    const user = await newUser.save();
    user.hash_password = undefined;
    return res.json(user);

  } catch (err) {
    console.log('Registration Error: ', err);
    return res.status(400).send({ message: err.message });
  }
};
