const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Item = require('./models/Item');
const User = require('./models/User');

/** @typedef {import('./models/User').User} User */


const app = express();
const port = 5000;

const dbURI = process.env.DB_URI;
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(dbURI)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

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

    /** @type {Promise<User>} */
    const findUser = User.findOne({ username }, null, null).exec();

    findUser
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
    const user = await User.findById(decoded.userId, null, null).select('-password -__v -_id');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Invalid token');
  }
});

app.get('/item-details/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const item = await Item.findOne({ slug }, null, null);
    if (!item) {
      return res.status(200).send({ stock: 0, price: 0 });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send('Error fetching item details');
  }
});

app.put('/update-item/:slug', async (req, res) => {
  const { slug } = req.params;
  const { stock, price } = req.body;
  try {
    const options = { new: true };
    let item = await Item.findOneAndUpdate({ slug }, { stock, price }, options);
    if (!item) {
      item = new Item({ slug, stock, price });
      await item.save();
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send('Error updating item details');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});