import apiClient from '../../utils/apiClient'

class SignUp {
  static async previousPostSignupDataForEmployee() {
    const response = await apiClient.getRequest(`/user/post-signup-employer-data`)
    return response
  }

  static async previousPostSignupDataForCompany() {
    const response = await apiClient.getRequest(`/user/post-signup-company-data`)
    return response
  }
}

export default SignUp
