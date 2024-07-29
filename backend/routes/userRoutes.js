const express = require('express');
const { 
  register, 
  login, 
  getUserDetails, 
  updateUser, 
  updatePassword, 
  getUsers, 
  deleteUser, 
  updateUserById 
} = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user-details', authenticateToken, getUserDetails);
router.put('/update-user', authenticateToken, updateUser);
router.put('/update-password', authenticateToken, updatePassword);
router.get('/users', authenticateToken, getUsers);
router.put('/users/:id', authenticateToken, updateUserById); // Ensure this route is correct

module.exports = router;
