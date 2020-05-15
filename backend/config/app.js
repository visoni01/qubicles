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
      default: 'Xk2LguhNG6bdgITIWtjyMtTaX',
      env: 'TWITTER_CONSUMER_KEY'
    },
    consumerSecret: {
      default: 'YU0Cdnf7qUYSSQTBZxuYron58jaWNSEuqxMGtLxzKvgzfA1wfH',
      env: 'TWITTER_CONSUMER_SECRET'
    },
    callbackURL: {
      default: 'http://127.0.0.1:4000/api/v1/auth/twitter/callback',
      env: 'TWITTER_CALLBACK_URL'
    }
  },
  facebook: {
    appId: {
      default: '504642537099415',
      env: 'FACEBOOK_APP_ID'
    },
    appSecret: {
      default: '978eda810fafbb84f7d81a7520b3a558',
      env: 'FACEBOOK_APP_SECRET'
    },
    callbackURL: {
      default: 'https://localhost:4000/api/v1/auth/facebook/callback',
      env: 'FACEBOOK_CALLBACK_URL'
    }
  },
  linkedin: {
    apiKey: {
      default: '86s2vtt5wz7q8h',
      env: 'LINKEDIN_ID'
    },
    secretkey: {
      default: 'mXUWVEc2q14spFXe',
      env: 'LINKEDIN_SECRET'
    },
    callbackURL: {
      default: 'https://localhost:4000/api/v1/auth/linkedin/callback',
      env: 'LINKEDIN_CALLBACK_URL'
    }
  },
  mailgun: {
    user: {
      default: 'postmaster@sandbox21f43ee694564675a8a008fc90465f04.mailgun.org',
      env: 'MAILGUN_USER'
    },
    password: {
      default: '29eldds1uri6',
      env: 'MAILGUN_PASSWORD'
    },
    apiKey: {
      default: 'key-3246bb46991293703fae15ce860f8da3',
      env: 'MAILGUN_APIKEY'
    },
    domain: {
      default: 'messenger.qubicles.io',
      env: 'MAILGUN_DOMAIN'
    }
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
