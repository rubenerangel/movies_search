const { Router } = require('express');
const moviesController = require('../controllers/MoviesController');
const jwt = require('jsonwebtoken');

const routeMiddleware = Router();
const route = Router();

routeMiddleware.use((req, res, next) => {
  const token = req.headers['access-token'];
  if (token) {
    /* Creación del Token */
    const payload = {
			check:  true
		};
    const tokenInit = jwt.sign(payload, req.app.settings.token, {
			expiresIn: 1440
		});

    // console.log(tokenInit);

    jwt.verify(token, req.app.settings.token, (err, decoded) => {
      if ( err ) {
        return res.json({message: 'Invalid Token'})
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    res.send({
      message: 'Token Not Exist.'
    });
  }
});

route.get('/', routeMiddleware, moviesController.index);
route.get('/api/v1/movies', routeMiddleware, moviesController.index);

module.exports = route;