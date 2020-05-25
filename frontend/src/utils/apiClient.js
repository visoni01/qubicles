import axios from "axios";

const baseURL = process.env.REACT_APP_NODE_BASE_URL;

class ApiClient {
  constructor(axiosInst) {
    this.axios = axiosInst;
    this._localStorage = window.localStorage;
  }

  makeRequest = (url, method, data = {}) =>  this.axios({ url, method, data });

  getRequest = (url, config) => this.makeRequest(url, "get", config);

  putRequest = (url, config) => this.makeRequest(url, "put", config);

  postRequest = (url, config) => this.makeRequest(url, "post", config);

  deleteRequest = (url, config) => this.makeRequest(url, "delete", config);

  signup = body => this.postRequest('/user/signup',body)
}

const axiosInst = axios.create({ baseURL });

export default new ApiClient(axiosInst);
