import _ from 'lodash'
import apiClient from '../../utils/apiClient'

class People {
  // Job section's API

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

  static async getAgentResume({ candidateId }) {
    const response = await apiClient.getRequest(`/people/agent/resume/${ candidateId }`)
    return response
  }

  static async getJobSkills() {
    const response = await apiClient.getRequest('/people/skills')
    return response
  }
}

export default People
