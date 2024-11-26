const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
    firstname: {
        type: String,
        trim: true,
        required: [true, 'name required'],

    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'name required'],

    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String
    },
    role: {
    type: String,
    enum: ['user','admin'],
    default: 'user',

    },


    },
    {timestamps: true });  
  
    userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

const User = mongoose.model('User' , userSchema);

module.exports = User;