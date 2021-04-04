const { Router } = require('express');
const moviesController = require('../controllers/MoviesController');

const route = Router();

route.get('/', moviesController.index);

module.exports = route;
