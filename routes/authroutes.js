const express = require('express');
const authcontroller = require('../controller/authcontroller');


const router = express.Router();

router
.route('/signup')
.post(authcontroller.signup);

router.route('/login')
.post(authcontroller.login);

router.route('/create')
.post(authcontroller.create);

router.route('/protect')
.post(authcontroller.protect);

router.route('/fetch')
.get(authcontroller.fetchall);

router.route('/delete')
.delete(authcontroller.delete);

module.exports = router;