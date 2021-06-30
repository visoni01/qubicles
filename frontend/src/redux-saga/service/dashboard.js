import apiClient, { axiosInst } from '../../utils/apiClient'

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

  static async fetchPosts({ ownerId }) {
    const url = '/dashboard/post-status-list'
    const queryParams = {}
    let response
    if (ownerId) {
      queryParams.owner_id = ownerId
    }
    if (queryParams.owner_id) {
      response = await apiClient.getRequest(url, null, queryParams)
    } else {
      response = await apiClient.getRequest(url)
    }
    return response
  }

  static async addPost({ file, text, activityPermission }) {
    const formData = new FormData()

    if (file) {
      const imageFile = await fetch(file).then((r) => r.blob())
      formData.append('file', imageFile)
    }

    formData.set('text', text)
    formData.set('activityPermission', activityPermission)

    const response = await axiosInst({
      method: 'post',
      url: '/dashboard/post-status',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response
  }

  static async editPost({
    file, text, removeCurrentImage, userActivityId, permission,
  }) {
    const formData = new FormData()

    if (file) {
      const imageFile = await fetch(file).then((r) => r.blob())
      formData.append('file', imageFile)
    }

    formData.set('text', text)
    formData.set('remove_image', removeCurrentImage)
    formData.set('permission', permission)

    const response = await axiosInst({
      method: 'put',
      url: `/dashboard/post-status/${ userActivityId }`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response
  }

  static async likePost(data) {
    const response = await apiClient.postRequest('/dashboard/post-status/activity/like', data)
    return response
  }

  static async unlikePost(data) {
    const response = await apiClient.postRequest('/dashboard/post-status/activity/unlike', data)
    return response
  }

  static async deletePost({ userActivityId }) {
    const response = await apiClient.deleteRequest(`/dashboard/post-status/${ userActivityId }`)
    return response
  }

  static async addPostComment({ data }) {
    const response = await apiClient.postRequest(`/dashboard/post/comments/${ data.userActivityId }`, { data })
    return response
  }

  static async getPostComments({ limit, offset, userActivityId }) {
    const url = `/dashboard/post/comments/${ userActivityId }`
    const response = await apiClient.getRequest(url, null, { limit, offset })
    return response
  }

  static async deletePostComment({ userActivityId, data }) {
    const response = await apiClient.deleteRequest(`/dashboard/post/comments/${ userActivityId }`, { data })
    return response
  }

  static async updatePostComment({ userActivityId, data }) {
    const response = await apiClient.putRequest(`/dashboard/post/comments/${ userActivityId }`, { data })
    return response
  }
}

export default Dashboard
