const express = require('express');
const { 
  register, 
  login, 
  getUserDetails, 
  updateUser, 
  updatePassword, 
  getUsers, 
  deleteUser, 
  updateUserById,
  forceLogout,
  getUserProfilePicture
} = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/users/:id/force-logout', authenticateToken, isAdmin, forceLogout);
router.get('/user-details', authenticateToken, getUserDetails);
router.put('/update-user', authenticateToken, upload.single('profilePicture'), updateUser);
router.put('/update-password', authenticateToken, updatePassword);
router.get('/users', authenticateToken, isAdmin, getUsers);
router.put('/users/:id', authenticateToken, isAdmin, updateUserById);
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser);
router.get('/user-profile-picture/:id', getUserProfilePicture);

module.exports = router;
