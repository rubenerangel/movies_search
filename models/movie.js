'use strict';

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('movie', {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    mdbID: DataTypes.STRING,
    type: DataTypes.STRING,
    poster: DataTypes.STRING
  },{
    sequelize,
    modelName: 'movie',
    tableName: 'movies_ruben',
    classMethods: {}
  });

  return Movie;
};

