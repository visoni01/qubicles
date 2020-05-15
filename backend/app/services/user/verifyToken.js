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
        return
      }
      if (!(await this.checkIfEmailAlreadyVerified(jwtVerified.email))) {
        const user = await User.update(
          { email_verified: true },
          { where: { email: jwtVerified.email } }
        )
        return 'Email Verified Successfully!!'
      } else {
        return 'Email already verified Successfully!!'
      }
    })
  }

  async checkIfEmailAlreadyVerified (email) {
    const user = await User.findOne({ where: { email }, raw: true })
    return user.email_verified
  }
}
