import apiClient, { axiosInst } from '../../utils/apiClient'

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

  static async getInviterDetails(walletId) {
    const response = await apiClient.getRequest(`/user/invite/${ walletId }`)
    return response
  }

  static async forgetPasswordMail(email) {
    const response = await apiClient.postRequest('/auth/reset-password-mail', { email })
    return response
  }

  static async resetPassword(data) {
    const response = await apiClient.postRequest('/auth/reset-password', { ...data })
    return response
  }

  static async uploadProfileImage({ data }) {
    const response = await axiosInst({
      method: 'post',
      url: '/user/upload-profile-image',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response
  }
}

export default User
