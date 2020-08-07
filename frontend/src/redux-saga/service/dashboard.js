import apiClient from '../../utils/apiClient'

class Dashboard {
  static async fetchAnnouncement() {
    const response = await apiClient.getRequest('/dashboard/latest-announcements')
    return response
  }

  static async fetchCommunityRep() {
    const response = await apiClient.getRequest('/dashboard/community-rep')
    return response
  }

  static async fetchJobPostings() {
    return [ {
      jobTitle: 'Customer Specialist',
      applicants: 34,
    },
    {
      jobTitle: 'Call Center Supervisor',
      applicants: 7,
    },
    ]
  }

  static async fetchActiveUsers() {
    return [ {
      userName: 'Robert Downy',
      status: 'offline',
    },
    {
      userName: 'Johnny Depp',
      status: 'online',
    },
    ]
  }

  static async fetchPosts() {
    const response = await apiClient.getRequest('/dashboard/status-list')
    return response
  }

  static async addPost({ data }) {
    const response = await apiClient.postRequest('/dashboard/status-list', data)
    return response
  }
}

export default Dashboard
