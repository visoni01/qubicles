import _ from 'lodash'
import apiClient, { axiosInst } from '../../utils/apiClient'

class People {
  /* Client (contact center) section's API */

  // Jobs' API
  // eslint-disable-next-line complexity
  static async fetchJobCategoriesAndJobs({
    searchKeyword, categoryId, status, clientId, limit, offset,
  }) {
    const url = '/jobs'
    const queryParams = {}
    if (searchKeyword && searchKeyword.trim()) {
      queryParams.search_keyword = searchKeyword
    }

    if (categoryId) {
      queryParams.category_id = categoryId
    }

    if (status) {
      queryParams.status = status
    }

    if (clientId) {
      queryParams.client_id = clientId
    }

    if (limit) {
      queryParams.limit = limit
    }
    if (!_.isUndefined(offset)) {
      queryParams.offset = offset
    }

    const response = await apiClient.getRequest(url, null, queryParams)
    return response
  }

  static async fetchJobCategoriesOnly({ searchKeyword }) {
    const url = '/jobs/categories'
    const queryParams = {}
    let response
    if (searchKeyword && searchKeyword.trim()) {
      queryParams.search_keyword = searchKeyword
    }

    if (queryParams.search_keyword) {
      response = await apiClient.getRequest(url, null, queryParams)
    } else {
      response = await apiClient.getRequest(url)
    }
    return response
  }

  static async deleteJob({ jobId }) {
    const response = await apiClient.deleteRequest(`jobs/${ jobId }`)
    return response
  }

  static async addJob(payload) {
    const response = await apiClient.postRequest('/jobs', payload)
    return response
  }

  static async updateJob({ jobId, ...payload }) {
    const response = await apiClient.putRequest(`/jobs/${ jobId }`, payload)
    return response
  }

  static async getJobCategoriesTitlesAndSkills() {
    const response = await apiClient.getRequest('/jobs/new/job-fields')
    return response
  }

  static async getJobById(jobId) {
    const response = await apiClient.getRequest(`/jobs/job/${ jobId }`)
    return response
  }

  // Talent Api's
  static async getTalentCards(filter) {
    let talentFilter = filter
    if (talentFilter.requiredSkills) {
      talentFilter = {
        ...talentFilter,
        requiredSkills: JSON.stringify(talentFilter.requiredSkills),
      }
    }
    if (talentFilter.requiredLanguges) {
      talentFilter = {
        ...talentFilter,
        requiredLanguges: JSON.stringify(talentFilter.requiredLanguges),
      }
    }
    const response = await apiClient.getRequest('/people/talent/cards', null, talentFilter)
    return response
  }

  static async getUserSkills({ candidateId }) {
    // WIP Add Talent cards backend getter api
    const response = await apiClient.getRequest(`/people/skills/${ candidateId }`)
    return response
  }

  static async updateUserSkills({ candidateId, updatedData, updatedDataType }) {
    const response = await apiClient.putRequest(`/people/skills/${ candidateId }`, {
      updatedDataType,
      updatedData,
    })
    return response
  }

  static async getAgentResume({ candidateId }) {
    const response = await apiClient.getRequest(`/people/agent/resume/${ candidateId }`)
    return response
  }

  static async getJobSkills() {
    const response = await apiClient.getRequest('/people/skills')
    return response
  }

  // Application's API
  static async createJobApplication(data) {
    const response = await apiClient.postRequest('/people/applications', { data })
    return response
  }

  static async fetchJobApplicationById(data) {
    const response = await apiClient.getRequest('/people/applications', null, data)
    return response
  }

  static async updateJobApplication(data) {
    const response = await apiClient.putRequest(`/people/applications/${ data.applicationId }`, { data })
    return response
  }

  static async fetchJobApplicationListByJobId(data) {
    const response = await apiClient.getRequest(`/people/applications/job/${ data.jobId }`)
    return response
  }

  static async fetchJobApplicationListByAgentId(data) {
    const response = await apiClient.getRequest(`/people/applications/user/${ data.agentUserId }`, null, {
      limit: data.limit,
      offset: data.offset,
      statusTypes: data.statusTypes,
    })
    return response
  }

  // Agent Jobs' API
  static async fetchAgentJobs(filter) {
    let agentJobFilter = filter
    if (agentJobFilter.requiredCategory) {
      agentJobFilter = {
        ...agentJobFilter,
        requiredCategory: JSON.stringify(agentJobFilter.requiredCategory),
      }
    }
    if (agentJobFilter.requiredSkills) {
      agentJobFilter = {
        ...agentJobFilter,
        requiredSkills: JSON.stringify(agentJobFilter.requiredSkills),
      }
    }
    if (agentJobFilter.requiredLanguages) {
      agentJobFilter = {
        ...agentJobFilter,
        requiredLanguages: JSON.stringify(agentJobFilter.requiredLanguages),
      }
    }
    const response = await apiClient.getRequest('/agent/jobs', null, agentJobFilter)
    return response
  }

  static async fetchTopCompanies() {
    const response = await apiClient.getRequest('/agent/jobs/top-companies')
    return response
  }

  // Top Talent API
  static async fetchTopTalent() {
    const response = await apiClient.getRequest('/people/top-talent')
    return response
  }

  // Top Talent API
  static async fetchPeopleYouMayKnow() {
    const response = await apiClient.getRequest('/agent/jobs/people-you-may-know')
    return response
  }

  // Training Jobs' API
  static async addCourse({ course }) {
    const formData = new FormData()

    if (course.contentSection.thumbnailImage) {
      const file = await fetch(course.contentSection.thumbnailImage).then((r) => r.blob())
      formData.append('file', file)
    }

    const courseJson = JSON.stringify(course)
    formData.set('course', courseJson)

    const response = await axiosInst({
      method: 'post',
      url: '/people/course',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response
  }

  static async fetchAllCourses({ ownerId }) {
    const response = await apiClient.getRequest('/people/course', null, { ownerId })
    return response
  }
}

export default People
