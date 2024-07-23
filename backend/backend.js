require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
const port = 5000;

const dbURI = process.env.DB_URI;
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to db'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
    firstName: String,
    lastName: String,
    city: String,
    phoneNumber: String
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { username, password, firstName, lastName, city, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        city,
        phoneNumber
    });
    user.save()
        .then(user => {
            const token = jwt.sign({ userId: user._id }, jwtSecret);
            res.status(201).send({ token });
        })
        .catch(err => res.status(400).send(err));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).send('User not found');
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
              const token = jwt.sign({ userId: user._id }, jwtSecret);
              res.status(200).send({ message: 'Login successful', token });
          } else {
            res.status(400).send('Password is incorrect');
          }
        });
    })
    .catch(err => res.status(500).send(err));
});

app.get('/user-details', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent as "Bearer <token>"
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.userId).select('-password -__v -_id');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Invalid token');
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});