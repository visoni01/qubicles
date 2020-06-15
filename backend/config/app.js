const convict = require('convict')
require('dotenv').config()

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
      default: 'http://localhost:4000/api/v1',
      env: 'WEB_APP_BASE_URL'
    }
  },
  qubiclesMailIds: {
    sales: {
      default: '',
      env: 'QUBICLE_MAIL_ID_SALES'
    }
  },
  qbeCreatorPermission: {
    apinode: {
      default: '',
      env: 'TELOSAPINODE'
    },
    qbe: {
      default: '',
      env: 'QBEACCOUNTKEY'
    },
    owner: {
      default: '',
      env: 'QBENEWACCTKEY'
    }
  },
  google: {
    clientId: {
      default: '',
      env: 'GOOGLE_CLIENT_ID'
    },
    clientSecret: {
      default: '',
      env: 'GOOGLE_CLIENT_SECRET'
    },
    callbackURL: {
      default: '',
      env: 'GOOGLE_CALLBACK_URL'
    }
  },
  activeCampaign: {
    baseUrl: {
      default: '',
      env: 'ACTIVE_CAMPAIGN_BASE_URL'
    },
    apiToken: {
      default: '',
      env: 'ACTIVE_CAMPAIGN_API_TOKEN'
    }
  },
  invite: {
    baseUrl: {
      default: '',
      env: 'INVITE_BASE_URL'
    },
    secret: {
      default: '',
      env: 'INVITE_SECRET'
    },
    user_credit: {
      default: '',
      env: 'INVITE_USER_CREDIT'
    },
    referral_credit: {
      default: '',
      env: 'INVITE_REFERRAL_CREDIT'
    },
    max_user_credit: {
      default: '',
      env: 'INVITE_MAX_USER_CREDIT'
    }
  },
  jwt: {
    loginTokenSecret: {
      default: 'secret',
      env: 'JWT_LOGIN_SECRET'
    },
    loginTokenExpiry: {
      default: '2d',
      env: 'JWT_LOGIN_TOKEN_EXPIRY'
    },
    emailVerificationTokenSecret: {
      default: 'secret',
      env: 'JWT_EMAIL_VERIFICATION_SECRET'
    },
    emailVerificationTokenExpiry: {
      default: '1d',
      enc: 'JWT_EMAIL_VERIFICATION_EXPIRY'
    }
  },
  flow: {
    path: {
      default: '/Flow',
      env: 'FLOW_PATH'
    }
  }
})
config.validate({ allowed: 'strict' })

module.exports = config
