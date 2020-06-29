import apiClient from '../../utils/apiClient'

class Dashboard {
  static async fetchAnnouncement() {
    const { data } = await apiClient.getAnnouncements()
    const announcements = data.result.map((record) => {
      const dateObj = new Date(record.date)
      return {
        date: `${ dateObj.toDateString() }`,
        data: record.title,
      }
    })
    return announcements
  }

  static async fetchCommunityRep() {
    const { data } = await apiClient.getCommunityRep()
    const {
      rating, likes, subscribers, raters,
    } = data.result
    return [ {
      rating,
      likes,
      followers: subscribers,
      raters,
    } ]
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
