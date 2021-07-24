const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const routers = require('./routes/authroutes');
const surveyrouter = require('./routes/surveyroutes');


app.use('/auth',routers);

app.use('/survey',surveyrouter);


module.exports = app;