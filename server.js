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
