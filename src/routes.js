const express = require('express');
const { signup } = require('./controllers/users')

const routes = express();

routes.post('/signup', signup)

module.exports = routes;