const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Qubicles App',
      format: String,
      default: 'Qubicles App'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'PORT'
  },
  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },
  sequelize: {
    name: {
      default: 'qubiclesapp',
      env: 'DB_NAME'
    },
    user: {
      default: 'root',
      env: 'DB_USER'
    },
    password: {
      default: 'root',
      env: 'DB_PASSWORD'
    },
    host: {
      default: 'localhost',
      env: 'DB_HOST'
    },
    port: {
      default: 5432,
      env: 'DB_PORT'
    }
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
