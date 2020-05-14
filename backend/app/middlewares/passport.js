import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
import config from '../../config/app'

function initPassport() {
  passport.use(new TwitterStrategy({
    consumerKey: config.get('twitter.consumerKey'),
    consumerSecret: config.get('twitter.consumerSecret'),
    callbackURL: config.get('twitter.callbackURL'),
    proxy: false
  }, function(token, tokenSecret, profile, done) {
     return done(null, profile)
  } 
  ))

  passport.use(new FacebookStrategy({
    clientID: config.get('facebook.appId'),
    clientSecret: config.get('facebook.appSecret'),
    callbackURL: config.get('facebook.callbackURL'),
    profileFields: ['email', 'name']

  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
  ))

  passport.use(new LinkedInStrategy({
    clientID: config.get('linkedin.apiKey'),
    clientSecret: config.get('linkedin.secretkey'),
    callbackURL: config.get('linkedin.callbackURL'),
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile)
    })
  }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(obj, done) {
    done(null, obj)
  })
}  

module.exports = initPassport