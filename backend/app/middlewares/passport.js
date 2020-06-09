import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { User } from '../db/models'
import config from '../../config/app'
import SocialSignup from '../services/signup/socialSignup'

function initPassport () {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.get('jwt.loginTokenSecret')

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async function (email, password, done) {
    const user = await User.findOne({ where: { email } })
    if (user == null) {
      done('Email not registered!')
    } else {
      if (!await user.comparePassword(password)) {
        done('Incorrect Password')
      } else {
        const userObj = user.get({ plain: true })
        const jwtToken = await jwt.sign({ email, user_id: userObj.user_id },
          config.get('jwt.loginTokenSecret'), {
            expiresIn: config.get('jwt.loginTokenExpiry')
          })
        userObj.accessToken = jwtToken
        return done(null, userObj)
      }
    }
  })
  )

  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await User.findOne({ where: { user_id: jwt_payload.user_id } })
    if (user) {
      return done(null, user)
    } else {
      return done('User not found')
    }
  }))

  passport.use(new TwitterStrategy({
    consumerKey: config.get('twitter.consumerKey'),
    consumerSecret: config.get('twitter.consumerSecret'),
    callbackURL: config.get('twitter.callbackURL'),
    userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    proxy: false
  }, function (token, tokenSecret, profile, done) {
    if (profile) {
      const userDetailsJson = profile._json
      const user = {
        type: 'twitter_id',
        full_name: userDetailsJson.name,
        id: userDetailsJson.id,
        email: userDetailsJson.email
      }
      SocialSignup.execute(user)
      return done(null, profile)
    }
  }
  ))

  passport.use(new FacebookStrategy({
    clientID: config.get('facebook.appId'),
    clientSecret: config.get('facebook.appSecret'),
    callbackURL: config.get('facebook.callbackURL'),
    profileFields: ['email', 'name']
  }, function (accessToken, refreshToken, profile, done) {
    if (profile) {
      if (profile._json) {
        const userDetailsJson = profile._json
        const user = {
          type: 'facebook_id',
          full_name: userDetailsJson.first_name + ' ' + userDetailsJson.last_name,
          id: userDetailsJson.id,
          email: userDetailsJson.email
        }
        SocialSignup.execute(user)
        return (null, profile)
      }
    }
  }
  ))

  passport.use(new LinkedInStrategy({
    clientID: config.get('linkedin.apiKey'),
    clientSecret: config.get('linkedin.secretkey'),
    callbackURL: config.get('linkedin.callbackURL'),
    scope: ['r_emailaddress', 'r_liteprofile']
  }, function (req, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      if (profile) {
        const user = {
          type: 'linkedin_id',
          full_name: profile.displayName,
          id: profile.id,
          email: profile.emails[0].value
        }
        SocialSignup.execute(user)
        return done(null, profile)
      }
    })
  }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (obj, done) {
    done(null, obj)
  })
}

module.exports = initPassport
