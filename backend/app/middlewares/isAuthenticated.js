import passport from 'passport'
import logger from '../common/logger'
import _ from 'lodash'

export function isAuthenticated (req, res, next) {
  passport.authenticate('jwt', (err, user) => {
    if (err) {
      return res.status(401).json({ message: err })
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return res.status(401).send(loginErr)
      }

      const fields = [
        'user_id',
        'facebook_id',
        'twitter_id',
        'linkedin_id',
        'user',
        'full_name',
        'user_level',
        'email',
        'user_code'
      ]
      logger.info(`USER ======> ${JSON.stringify(_.pick(user, fields))}`)
      req.body.user = user
      req.body.user_id = user.user_id
      next()
    })
  })(req, res, next)
}
