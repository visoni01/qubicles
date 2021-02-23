import apiClient from '../../utils/apiClient'

class SignUp {
  static async previousPostSignupDataForEmployee() {
    const response = await apiClient.getRequest('/user/post-signup-employer-data')
    return response
  }

  static async previousPostSignupDataForAgent() {
    const response = await apiClient.getRequest('/user/post-signup-agent-data')
    return response
  }
}

export default SignUp
