const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
const port = 5000;

const dbURI = '***REMOVED***';

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
            const token = jwt.sign({ userId: user._id }, 'some-key');
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
              const token = jwt.sign({ userId: user._id }, 'some-key');
              res.status(200).send({ message: 'Login successful', token });
          } else {
            res.status(400).send('Password is incorrect');
          }
        });
    })
    .catch(err => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});