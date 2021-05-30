const express = require('express');
const controller = require('./user.controller');
const authController = require('./auth.controller');
const imageController = require('../images/image.controller');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

module.exports = router;
