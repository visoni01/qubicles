import ServiceBase from '../../common/serviceBase'
import jwt from 'jsonwebtoken'
import { User } from '../../db/models'
import CreateUserGroup from '../user/createUserGroup'
import config from '../../../config/app'

const constraints = {
  token: {
    presence: { allowEmpty: false }
  }
}

export default class VerifyTokenService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    return jwt.verify(this.args.token, 'secret', async (err, jwtVerified) => {
      if (err) {
        this.addError('verifyTokenError', 'Verification link is expired or invalid')
        return
      }
      if (jwtVerified) {
        const user = await this.checkIfEmailAlreadyVerified(jwtVerified.email)
        if (!(user.email_verified)) {
          // Create User Group
          const newUserGroup = await CreateUserGroup.execute({
            id: user.user_id,
            full_name: user.full_name
          })
          await User.update({
            email_verified: true,
            user_group: newUserGroup.user_group
          },
            { where: { email: jwtVerified.email } })

          const jwtToken = await jwt.sign({ email: jwtVerified.email, user_id: user.user_id },
            config.get('jwt.loginTokenSecret'), {
            expiresIn: config.get('jwt.loginTokenExpiry')
          })
          return {
            message: 'Email Verified Successfully!!',
            accessToken: jwtToken
          }
        } else {
          return 'Email already verified Successfully!!'
        }
      }
    })
  }

  async checkIfEmailAlreadyVerified (email) {
    const user = User.findOne({ where: { email }, raw: true })
    return user
  }
}
