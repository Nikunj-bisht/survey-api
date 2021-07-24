const express = require('express');

const surveycontroller = require('../controller/surveycontroller');
const authcontroller = require('../controller/authcontroller');

const router = express.Router();

router.route('/createsurvey')
.get(authcontroller.protect,surveycontroller.createsurvey);


router.route('/fetchsurveys')
.get(authcontroller.protect,surveycontroller.fetchallsurveys);

router.route('/fetchques')
.get(authcontroller.protect,surveycontroller.fetchquestions);

router.route('/storeanswers')
.post(authcontroller.protect,surveycontroller.saveanwers);

router.route('/getresultforsurvey')
.get(authcontroller.protect,surveycontroller.getresult);


router.route('/createtable')
.post(surveycontroller.surveytable);


module.exports = router;
