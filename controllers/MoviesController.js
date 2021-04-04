const Movie = require('../models/').movie;
const getMoviesOMDB = require('../services/index.js');

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
            .then(movie => console.log(movie))
            .catch(error => console.log(error));

        });
      }
    } else {
      return Movie.findAll({})
        .then(movie => res.status(200).send(movie))
    }
  },
};
