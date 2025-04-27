const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');
const { login }    = require('../controllers/loginController');
const {forgotPassword,resetPassword}=require('../controllers/passwordController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',   resetPassword);



module.exports = router;
