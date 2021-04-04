const axios = require('axios');

let moviesOMDB = async (page) => {
  
  return await axios.get(`http://www.omdbapi.com/?apikey=5eec5adc&s=love&y=2020&type=movie&page=${page}`)
    .then(res => {
      return res.data
    });
}

module.exports = moviesOMDB;
