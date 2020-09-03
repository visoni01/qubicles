import ServiceBase from '../../common/serviceBase'
import jwt from 'jsonwebtoken'
import { User, UserDetail } from '../../db/models'
import { CreateUserGroupService } from '../user/createUserGroup'
import config from '../../../config/app'
import { ERRORS } from '../../utils/errors'

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
    return jwt.verify(this.args.token, config.get('jwt.emailVerificationTokenSecret'), async (err, jwtVerified) => {
      if (err) {
        this.addError(ERRORS.BAD_REQUEST, 'Verification link is expired or invalid')
        return
      }
      if (jwtVerified) {
        const user = await this.checkIfEmailAlreadyVerified(jwtVerified.email)
        if (!(user.email_verified)) {
          // Create User Group
          const newUserGroup = await CreateUserGroupService.execute({
            id: user.user_id,
            full_name: user.full_name
          })
          await User.update({
            email_verified: true,
            user_group: newUserGroup.user_group
          },
          { where: { email: jwtVerified.email } })

          const userData = await UserDetail.findOne({
            where: { user_id: user.user_id }
          })
          const jwtToken = await jwt.sign({
            email: jwtVerified.email,
            user_id: user.user_id,
            full_name: user.full_name,
            is_post_signup_completed: userData.is_post_signup_completed
          },
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
