import _ from 'lodash'
import apiClient, { axiosInst } from '../../utils/apiClient'
import { enrolledCourses } from '../../containers/People/ContactCenter/Training/testData'

class People {
  /* Client (contact center) section's API */

  // Jobs' API
  // eslint-disable-next-line complexity
  static async fetchJobCategoriesAndJobs({
    searchKeyword, categoryId, status, clientId, limit, offset,
  }) {
    const url = '/jobs'
    const queryParams = {}
    if (searchKeyword) {
      queryParams.search_keyword = searchKeyword.trim()
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

  // People You May Know API
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

  static async updateCourse({ course }) {
    const formData = new FormData()

    if (course.contentSection.thumbnailImage) {
      const file = await fetch(course.contentSection.thumbnailImage).then((r) => r.blob())
      formData.append('file', file)
    }

    const courseJson = JSON.stringify(course)
    formData.set('course', courseJson)

    const response = await axiosInst({
      method: 'put',
      url: '/people/course',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response
  }

  static async fetchAllCourses() {
    const response = await apiClient.getRequest('/people/course')
    return response
  }

  static async fetchCourse({ courseId }) {
    const response = await apiClient.getRequest(`/people/course/${ courseId }`)
    return response
  }

  static async fetchViewAllCourses({
    categoryId, searchField, courseFilter, offset,
  }) {
    const url = '/people/courses'
    const queryParams = {}

    if (categoryId) {
      queryParams.categoryId = categoryId
    }

    if (searchField) {
      queryParams.searchField = searchField.trim()
    }

    if (courseFilter) {
      queryParams.courseFilter = courseFilter
    }

    if (!_.isUndefined(offset)) {
      queryParams.offset = offset
    }

    const response = await apiClient.getRequest(url, null, queryParams)
    return response
  }

  static async fetchViewCourse({ courseId }) {
    const response = await apiClient.getRequest(`/people/course/${ courseId }/view`)
    return response
  }

  static async startCourse({ courseId }) {
    const response = await apiClient.getRequest(`/people/course/${ courseId }/start`)
    return response
  }

  static async fetchAndUpdateCourseUnit({ courseId, unitId, status }) {
    const response = await apiClient.putRequest(`/people/course/${ courseId }/unit`, { unitId, status })
    return response
  }

  static async fetchSectionTest({ courseId, sectionId }) {
    const response = await apiClient.getRequest(`/people/course/${ courseId }/test`, null, { sectionId })
    return response
  }

  static async submitSectionTest({ courseId, sectionId, questions }) {
    const response = await apiClient.postRequest(`/people/course/${ courseId }/test`, { sectionId, questions })
    return response
  }

  static async buyCourse({ courseId }) {
    const response = await apiClient.getRequest(`/people/course/${ courseId }/buy`)
    return response
  }

  static async fetchAssessmentTest({ courseId }) {
    const response = await apiClient.getRequest(`/people/course/${ courseId }/assessment-test`)
    return response
  }

  static async fetchAllTestEntries({ courseId }) {
    const response = await apiClient.getRequest(`/people/course/${ courseId }/test-entries`)
    return response
  }

  static async fetchTestEntryAnswers({ courseId, sectionId, candidateId }) {
    const response = await apiClient.getRequest(
      `/people/course/${ courseId }/test-entries/${ sectionId }`,
      null,
      { candidate_id: candidateId },
    )
    return response
  }

  static async validateTestEntryAnswers({
    courseId, sectionId, candidateId, validatedData,
  }) {
    const response = await apiClient.putRequest(
      `/people/course/${ courseId }/test-entries/${ sectionId }`,
      { candidate_id: candidateId, validated_data: validatedData },
    )
    return response
  }

  static async fetchEnrolledCourses() {
    // const response = await apiClient.getRequest('/people/enrolled-courses')
    const data = enrolledCourses
    return { data }
  }
}

export default People
