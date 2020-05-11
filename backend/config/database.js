const config = require('./app')

module.exports = {
  development: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    dialect: 'postgres'
  },
  test: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    dialect: 'postgres'
  },
  staging: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    dialect: 'postgres'
  },
  production: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    dialect: 'postgres'
    // dialectOptions: {
    //   ssl: {
    //     // ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
}
