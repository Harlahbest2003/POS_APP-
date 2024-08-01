const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Example payment routes
router.post('/initiate', paymentController.initiatePayment);

module.exports = router;
