const config = require('./app')

module.exports = {
  development: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    logging: false,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT0'
    },
    define: {
      timestamps: false
    }
  },
  test: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    dialect: 'mariadb',
    define: {
      timestamps: false
    }

  },
  staging: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    dialect: 'mariadb',
    define: {
      timestamps: false
    }

  },
  production: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    dialect: 'mariadb',
    define: {
      timestamps: false
    }
  }
}
