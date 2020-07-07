import apiClient from '../../utils/apiClient'

class Forum {
  static async fetchCategories() {
    const { data } = await apiClient.getRequest('/forum')
    return data.result
  }

  static async fetchChannel({ channelId }) {
    // const { data } = await apiClient.getRequest(`/channel/${ channelId }`)
    return {
      channelInfo: {
        channelId: 1,
        channelTitle: 'General Announcements',
        channelDescription: 'This channel is used to create posts about various company announcements. From new hires, to new policies or related topics. Find them all here, and participate!',
        totalMembers: 100,
        totalReplies: 700,
        topicsCount: 45,
        moderators: [
          {
            user_id: 1,
            user_name: 'Henry',
            profile_photo: 'https://via.placeholder.com/150x150'
          },
          {
            user_id: 2,
            user_name: 'Ron',
            profile_photo: 'https://via.placeholder.com/150x150'
          },
          {
            user_id: 3,
            user_name: 'Elie',
            profile_photo: 'https://via.placeholder.com/150x150'
          },
          {
            user_id: 4,
            user_name: 'Goa',
            profile_photo: 'https://via.placeholder.com/150x150'
          },
        ],
      },
      topics: [
        {
          topicId: 1,
          topicTitle: 'New Schedule During Covid-19 Pandemic',
          tags: [ 'Company', 'Business', 'Joint Venture' ],
          time: '2 hours ago',
          topicOwner: 'Ron Weasley',
          totalReplies: 56,
          lastReply: 'yesterday',
        },
        {
          topicId: 2,
          topicTitle: 'Welcome our new Director of Changing the World',
          tags: [ 'PartenerShips', 'Business', 'Joint Venture' ],
          time: 'yesterday',
          topicOwner: 'Hermione',
          totalReplies: 34,
          lastReply: '3 days ago',
        },
      ],
    }
  }
}

export default Forum
