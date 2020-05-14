import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
import config from '../../config/app'
import SocialSignup from '../services/signup/socialSignup'


function initPassport() {
  passport.use(new TwitterStrategy({
    consumerKey: config.get('twitter.consumerKey'),
    consumerSecret: config.get('twitter.consumerSecret'),
    callbackURL: config.get('twitter.callbackURL'),
    proxy: false
  }, function (token, tokenSecret, profile, done) {
    if (profile) {
      let userDetailsJson = profile._json
      let user = {
        type: 'twitterId',
        full_name: userDetailsJson.screen_name,
        id: userDetailsJson.id,
        email: userDetailsJson.name
      }
      SocialSignup.execute(user)
      return done(null, profile)
    }
    else {

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
        let userDetailsJson = profile._json
        let user = {
          type: 'facebookId',
          full_name: userDetailsJson.first_name + ' ' + userDetailsJson.last_name,
          id: userDetailsJson.id,
          email: userDetailsJson.email
        }
        SocialSignup.execute(user)
        return (null, done);
      }
    }
    else {

    }
  }
  ))

  passport.use(new LinkedInStrategy({
    clientID: config.get('linkedin.apiKey'),
    clientSecret: config.get('linkedin.secretkey'),
    callbackURL: config.get('linkedin.callbackURL'),
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      if (profile) {
        let user = {
          type: 'linkedInId',
          full_name: profile.displayName,
          id: profile.id,
          email: profile.emails[0].value
        }
        SocialSignup.execute(user)
        return done(null, done)
      }
      else {

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