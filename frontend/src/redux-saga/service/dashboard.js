import apiClient from '../../utils/apiClient'

class Dashboard {
  static async fetchAnnouncement() {
    const { data } = await apiClient.getRequest('/dashboard/latest-announcements')
    return data
  }

  static async fetchCommunityRep() {
    const { data } = await apiClient.getRequest('/dashboard/community-rep')
    return data
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
}

export default Dashboard
