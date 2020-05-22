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
  },
  twitter: {
    consumerKey: {
      default: '',
      env: 'TWITTER_CONSUMER_KEY'
    },
    consumerSecret: {
      default: '',
      env: 'TWITTER_CONSUMER_SECRET'
    },
    callbackURL: {
      default: '',
      env: 'TWITTER_CALLBACK_URL'
    }
  },
  facebook: {
    appId: {
      default: '',
      env: 'FACEBOOK_APP_ID'
    },
    appSecret: {
      default: '',
      env: 'FACEBOOK_APP_SECRET'
    },
    callbackURL: {
      default: '',
      env: 'FACEBOOK_CALLBACK_URL'
    }
  },
  linkedin: {
    apiKey: {
      default: '',
      env: 'LINKEDIN_ID'
    },
    secretkey: {
      default: '',
      env: 'LINKEDIN_SECRET'
    },
    callbackURL: {
      default: '',
      env: 'LINKEDIN_CALLBACK_URL'
    }
  },
  mailgun: {
    user: {
      default: '',
      env: 'MAILGUN_USER'
    },
    password: {
      default: '',
      env: 'MAILGUN_PASSWORD'
    },
    apiKey: {
      default: '',
      env: 'MAILGUN_APIKEY'
    },
    domain: {
      default: '',
      env: 'MAILGUN_DOMAIN'
    }
  },
  webApp: {
    baseUrl: {
      default: 'https://localhost:4000/api/v1',
      env: 'WEB_APP_BASE_URL'
    }
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
