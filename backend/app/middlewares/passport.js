import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import { Strategy as FacebookStrategy } from 'passport-facebook'
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
    return done(null, profile);
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