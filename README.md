# Movies Search - NodeJs, Express, Sequelize

Buscador de películas alojadas en OMDb

El servidor esta desarrollado en Express, y hace una busqueda de las peliculas en OMDb que contenga el texto __love__, si en la base de datos 
MySQL no hay registros el Back-End se encarga de ingresar los registros a la base de datos, y dejarlos disponibles para su consulta. Si al ingresar a la ruta raiz (/)
el Back-End detecta que ya hay registros, este simplemente devuelve los registros en la Base de Datos MySQL.

Se ha hecho uso de **sequelize** para la creación de migraciones y manejo de la base de datos.
