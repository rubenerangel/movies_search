const axios = require('axios');

let token = async (page) => {
  
  return await axios.get(`http://localhost:3001/token`)
    .then(res => {
      return res.data
    });
}

module.exports = token;
