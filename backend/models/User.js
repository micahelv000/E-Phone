const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    city: String,
    phoneNumber: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;