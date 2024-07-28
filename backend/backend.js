const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Item = require('./models/Item');
const User = require('./models/User');

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

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, jwtSecret);
      res.status(200).send({ message: 'Login successful', token });
    } else {
      res.status(400).send('Password is incorrect');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied');
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user;
    next();
  });
};

app.get('/user-details', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -__v');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Error fetching user details');
  }
});

app.put('/update-user', authenticateToken, async (req, res) => {
  const { username, firstName, lastName, city, phoneNumber } = req.body;
  const updateData = { username, firstName, lastName, city, phoneNumber };

  try {
    const options = { new: true };
    const user = await User.findByIdAndUpdate(req.user.userId, updateData, options);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Error updating user details');
  }
});


app.put('/update-password', authenticateToken, async (req, res) => {
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const options = { new: true };
    const user = await User.findByIdAndUpdate(req.user.userId, { password: hashedPassword }, options);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('Password updated successfully');
  } catch (error) {
    res.status(500).send('Error updating password');
  }
});

app.get('/item-details/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const item = await Item.findOne({ slug });
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

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send('Error fetching items');
  }
});


app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
