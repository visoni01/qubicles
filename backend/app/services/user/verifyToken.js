import ServiceBase from '../../common/serviceBase'
import jwt from 'jsonwebtoken'
import { User } from '../../db/models'

const constraints = {
  'token': {
    presence: { allowEmpty: false }
  }
}

export default class VerifyTokenService extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    jwt.verify(this.args.token, "secret", async (err, jwtVerified) => {
      if (err) {
      }
      if (jwtVerified) {
        const verifiedEmail = jwtVerified.email
        const user = await User.update(
          { email_verified: true },
          { where: { email: verifiedEmail } }
        )
      }
    })
  }
}
