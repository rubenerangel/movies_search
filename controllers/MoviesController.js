const Movie         = require('../models/').movie;
const getMoviesOMDB = require('../services/index.js');
const token = require('../services/token.js');
const jwt = require('jsonwebtoken');

module.exports = {
   async index(req,res) {
    const allMovies = await Movie.findAll({});
    
    if (!allMovies.length) {
      let moviesOMDB = await getMoviesOMDB(1);
      
      let pagMoviesOMDB = moviesOMDB.totalResults/10;

      pagMoviesOMDB = Math.ceil(pagMoviesOMDB) + 1;

      for (let index = 1; index < pagMoviesOMDB; index++) {
        let moviesPerPage = await getMoviesOMDB(index);
        
        moviesPerPage.Search.forEach(movie => {
          Movie
            .create({
              'title':  movie.Title,
              'year':   movie.Year,
              'mdbID':  movie.imdbID,
              'type':   movie.Type,
              'poster': movie.Poster,
            })
            .then(movie => movie.created)
            .catch(error => console.log(error));
        });
      }

      return Movie.findAll({})
        .then(movie => res.status(200).send(movie)
        )
        .catch(error => console.log(error));
    } else {
      return Movie.findAll({})
        .then(movie => res.json(movie)
        )
        .catch(error => console.log(error));
    }
  },

  getToken(req, res) {
    /* Creación del Token */
    const payload = {
			check:  true
		};
    const token = jwt.sign(payload, req.app.settings.token, {
			expiresIn: 1440
		});

    res.json({token})
  }
};
