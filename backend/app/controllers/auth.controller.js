import VerifyTokenMethod from '../services/user/verifyToken'

export default class AuthController {
  static async verifyToken (req, res) {
    const verifyTokenResult = await VerifyTokenMethod.execute(req.params)
    if (verifyTokenResult.successful) {
      res.cookie('access_token', verifyTokenResult.result.accessToken, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true
      })
      res.status(200).json({ message: 'User email verified Successfully!!' })
    } else {
      res.boom.badRequest('Validation didn\'t succeed', verifyTokenResult.errors)
    }
  }
}
