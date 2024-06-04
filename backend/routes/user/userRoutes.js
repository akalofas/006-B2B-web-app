const express = require('express');
const router = express.Router();

// Middleware and Limiters
const authorizeRoles = require('../../middleware/authorizeRoles');
const authenticateJWT = require('../../middleware/authenticateJWT');
const { emailVerificationLimiter } = require('../../utils/limiters/emailVerificationLimiter');

// Custom routes
const { registerUser } = require('../../controllers/user/registerUser');
const { loginUser } = require('../../controllers/user/loginUser');
const { logoutUser } = require('../../controllers/user/logout');
const { refreshToken } = require('../../controllers/auth/refreshToken');
const { getAllUsers } = require('../../controllers/user/getAllUsers');
const { updateUser } = require('../../controllers/user/updateUser');
const { verifyEmail } = require('../../controllers/user/verifyEmail');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private Routes use the middleware JWT
router.use(authenticateJWT);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshToken);
router.get('/verify-email/:token', emailVerificationLimiter, verifyEmail);
router.get('/', authorizeRoles('Admin'), getAllUsers);
router.patch('/update', authorizeRoles('Admin'), updateUser);


module.exports = router;