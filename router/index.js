const { Router } = require('express');

// controllers
const { createUser, generateOTP, verifyOTP } = require('../controller/user');

const router = Router();

// routes
router
    .post('/users', createUser)
    .post('/users/generateOTP', generateOTP)
    .get('/users/:user_id/verifyOTP/:otp', verifyOTP)
    .all('*', (req, res) => {
        res.status(404).json({
            status: 'error',
            message: 'Route does not exist',
        });
    });

module.exports = router;
