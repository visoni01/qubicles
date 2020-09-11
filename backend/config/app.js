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
  encryption: {
    initialization_vector: {
      doc: 'Initialization Vector',
      default: '',
      env: 'ENCRYPTION_INITIALIZATION_VECTOR'
    },
    initialization_key: {
      doc: 'Initialization Key',
      default: '',
      env: 'ENCRYPTION_KEY'
    },
    algorithm: {
      doc: 'Symmetric algorithm',
      default: '',
      env: 'ENCRYPTION_ALGORITHM'
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
      default: 3306,
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
      default: '',
      env: 'WEB_APP_BASE_URL'
    }
  },
  flowApp: {
    baseUrl: {
      default: 'http://localhost',
      env: 'FLOW_APP_BASE_URL'
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
      default: '',
      env: 'JWT_LOGIN_SECRET'
    },
    loginTokenExpiry: {
      default: '2d',
      env: 'JWT_LOGIN_TOKEN_EXPIRY'
    },
    emailVerificationTokenSecret: {
      default: '',
      env: 'JWT_EMAIL_VERIFICATION_SECRET'
    },
    emailVerificationTokenExpiry: {
      default: '',
      env: 'JWT_EMAIL_VERIFICATION_EXPIRY'
    }
  },
  flow: {
    path: {
      default: '/flow',
      env: 'FLOW_PATH'
    }
  },
  cookieMaxAge: {
    default: 1000 * 60 * 60 * 24,
    env: 'COOKIE_MAX_AGE'
  },
  ipfs: {
    host: {
      default: 'ipfs.telos.miami',
      env: 'IPFS_HOST_NAME'
    },
    port: {
      default: '5002',
      env: 'IPFS_PORT'
    },
    protocol: {
      default: 'https',
      env: 'IPFS_PROTOCOL'
    }
  },
  imageFileSize: {
    default: 1024 * 1024,
    env: 'IMAGE_MAX_SIZE'
  },
  checkr: {
    baseUrl: {
      default: '',
      env: 'CHECKR_BASE_URL'
    },
    publishableKey: {
      default: '',
      env: 'CHECKR_PUBLISHABLE_KEY'
    },
    secretKey: {
      default: '',
      env: 'CHECKR_SECRET_KEY'
    }
  }
})
config.validate({ allowed: 'strict' })

module.exports = config
