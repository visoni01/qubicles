import axios from 'axios'
import configEnv from './config'
import { handleResponse, handleReponseError } from './interceptors'

const baseURL = configEnv.NODE_BASE_URL

class ApiClient {
  constructor(axiosInst) {
    this.axios = axiosInst
  }

  makeRequest = (url, method, data = {}) => this.axios({
    url,
    method,
    data,
  })

  getRequest = async (url, config) => this.makeRequest(url, 'GET', config)

  putRequest = (url, config) => this.makeRequest(url, 'put', config)

  postRequest = async (url, config) => this.makeRequest(url, 'post', config)

  deleteRequest = (url, config) => this.makeRequest(url, 'delete', config)

  signup = (body) => this.postRequest('/user/signup', body)

  emailVerification = async (token) => {
    await this.getRequest(`/auth/verify-token/${ token }`)
  };

  postSignUp = (userType, step, body) => this.postRequest(`/${ userType }/post-signup/step${ step }`, body)

  inviteRequest = (methodType, { type, body }) => this.makeRequest(`/user/${ type }`, methodType, body)

  login = async (body) => {
    const { status } = await this.axios({
      url: '/user/login', method: 'post', data: body, withCredentials: true,
    })
    return status
  }

  getUser = async (token) => {
    const user = await this.axios({
      url: '/user/profile',
      method: 'get',
    })
    return user
  }
}

export const axiosInst = axios.create({
  baseURL,
})
axiosInst.defaults.withCredentials = true
axiosInst.interceptors.response.use(handleResponse, handleReponseError)

export default new ApiClient(axiosInst)
