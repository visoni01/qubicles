import apiClient from '../../utils/apiClient'

class User {
  static async login(body) {
    const { status } = await apiClient.postRequest('/user/login', body)
    return status
  }

  static async logout() {
    const { status } = await apiClient.postRequest('/user/logout')
    return status
  }
}

export default User
