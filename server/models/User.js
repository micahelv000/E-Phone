const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    city: String,
    phoneNumber: String,
    isAdmin: { type: Boolean, default: false },
    tokenVersion: { type: String, default: uuidv4 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;