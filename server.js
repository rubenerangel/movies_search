const express     = require('express');
const bodyParser  = require('body-parser');

/* Consultamos las variables de conexión */
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config/config.json')[env];
const Sequelize = require('sequelize');
const configjs  = require('./config/config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    
  }
);
const route   = require('./routes/index.js');

const app = express();

/* Settings */
const port = 3001;
app.set('token', configjs.TOKEN_SECRET);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* headers */
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/* Rutas */
app.use('/', route);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);

  sequelize.sync({force: false})
    .then( () => {
      console.log('Conected to DB...');
    })
    .catch(error => {
      console.log(error);
    })
});
