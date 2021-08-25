const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const checkAuth = require('../middleware/authorize');
const checkSignUpData = require('../middleware/checkSignUpData');

router.route('/signUp')
    .all(checkSignUpData)
    .post(auth.signUp)

router.route('/signIn')
    .post(auth.signIn)

router.route('/verify')
    .all(checkAuth)
    .get(auth.verify)

module.exports = router;