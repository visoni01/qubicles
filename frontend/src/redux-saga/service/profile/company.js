import apiClient from '../../../utils/apiClient'

class CompanyProfile {
  static async fetchCompanyProfileSettings() {
    const response = await apiClient.getRequest('/profile/company/settings')
    return response
  }
}

export default CompanyProfile
