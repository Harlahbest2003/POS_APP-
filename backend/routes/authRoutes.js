const express = require('express');
const router = express.Router();
const { register, login, requestPasscode, verifyPasscode } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.post('/request-passcode', requestPasscode);
router.post('/verify-passcode', verifyPasscode);

module.exports = router;
