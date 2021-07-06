require('dotenv').config();

const express = require('express');

//Express
const app = express();

//Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

module.exports = app;