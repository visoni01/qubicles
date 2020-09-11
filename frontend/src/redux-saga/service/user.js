import apiClient from '../../utils/apiClient'

class User {
  static async login(body) {
    const response = await apiClient.postRequest('/user/login', body)
    return response
  }

  static async logout() {
    const response = await apiClient.postRequest('/user/logout')
    return response
  }

  static async getCheckrInvitationLink() {
    const response = await apiClient.getRequest('/user/checkr-invitation')
    return response
  }

  static async updateUser(data) {
    const response = await apiClient.postRequest('/user/update', { data, update_user_code: true })
    return response
  }

  static async sendVerificationMail(email) {
    const response = await apiClient.postRequest('/auth/send-verification-mail', { email })
    return response
  }
}

export default User
