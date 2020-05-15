import ServiceBase from '../../common/serviceBase'
import jwt from 'jsonwebtoken'
import { User } from '../../db/models'

const constraints = {
  'token': {
    presence: { allowEmpty: false }
  }
}

export default class VerifyTokenService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    return await jwt.verify(this.args.token, "secret", async (err, jwtVerified) => {
      if (err) {
        this.addError('verifyTokenError', 'Verification link is expired or invalid')
      }
      if (jwtVerified) {
        const verifiedEmail = jwtVerified.email
        const user = await User.update(
          { email_verified: true },
          { where: { email: verifiedEmail } }
        )
        return 'Email Verified Successfully!!'
      }
    })
  }
}
