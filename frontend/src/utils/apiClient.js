import axios from 'axios'

const baseURL = process.env.REACT_APP_NODE_BASE_URL

const authToken = localStorage.getItem( 'token' )

class ApiClient {
  constructor( axiosInst ) {
    this.axios = axiosInst
    this.localStorageInst = window.localStorage
  }

  makeRequest = ( url, method, data = {} ) => this.axios( { url, method, data } );

  getRequest = ( url, config ) => this.makeRequest( url, 'get', config );

  putRequest = ( url, config ) => this.makeRequest( url, 'put', config );

  postRequest = ( url, config ) => this.makeRequest( url, 'post', config );

  deleteRequest = ( url, config ) => this.makeRequest( url, 'delete', config );

  signup = ( body ) => this.postRequest( '/user/signup', body );

  emailVerification = async ( token ) => {
    const { data } = await this.getRequest( `/auth/verifyToken/${ token }` )
    const { accessToken } = data.result
    this.localStorageInst.setItem( 'token', accessToken )
  };

  postSignUp = ( userType, step, body ) => this.postRequest( `/${ userType }/postSignup/step${ step }`, body );

  inviteRequest = async(methodType, {type, body}) =>
    await this.makeRequest(`/user/${type}`, methodType, body)
}

const axiosInst = axios.create( {
  baseURL,
  headers: {
    Authorization: `Bearer ${ authToken }`,
  },
} )

export default new ApiClient( axiosInst )
