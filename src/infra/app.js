const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const carController = require('../controller/car-controller');

const app = express();

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
nunjucks.configure(path.join(__dirname, "../view"),{
    autoescape: true,
    express: app,
});

carController.configure(app);

module.exports = app;