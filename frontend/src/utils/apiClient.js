import axios from 'axios'

const baseURL = process.env.REACT_APP_NODE_BASE_URL

class ApiClient {
  constructor(axiosInst) {
    this.axios = axiosInst
    this.localStorageInst = window.localStorage
  }

  authToken = () => this.localStorageInst.getItem('token')

  makeRequest = (url, method, data = {}) => this.axios({
    url,
    method,
    data,
    headers: {
      Authorization: `Bearer ${ this.authToken() }`,
    },
  });

  getRequest = (url, config) => this.makeRequest(url, 'get', config);

  putRequest = (url, config) => this.makeRequest(url, 'put', config);

  postRequest = (url, config) => this.makeRequest(url, 'post', config);

  deleteRequest = (url, config) => this.makeRequest(url, 'delete', config);

  signup = (body) => this.postRequest('/user/signup', body);

  emailVerification = async (token) => {
    const { data } = await this.getRequest(`/auth/verify-token/${ token }`)
    const { accessToken } = data.result
    this.localStorageInst.setItem('token', accessToken)
  };

  postSignUp = (userType, step, body) => this.postRequest(`/${ userType }/post-signup/step${ step }`, body);

  inviteRequest = (methodType, { type, body }) => this.makeRequest(`/user/${ type }`, methodType, body)

  login = async (body) => {
    const { data, status } = await this.axios({ url: '/user/login', method: 'post', data: body })
    const { accessToken } = data
    this.localStorageInst.setItem('token', accessToken)
    return status
  };

  getAnnouncements = () => this.getRequest('/dashboard/latest-announcements')

  getCommunityRep = () => this.getRequest('/dashboard/community-rep')

  getJobPostings = () => this.getRequest('/dashboard/job-postings')
}

const axiosInst = axios.create({
  baseURL,
})

export default new ApiClient(axiosInst)
