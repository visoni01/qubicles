import axios from 'axios'

const baseURL = process.env.REACT_APP_NODE_BASE_URL

const authToken = localStorage.getItem( 'token' )

class ApiClient {
  constructor( axiosInst ) {
    this.axios = axiosInst
    this.localStorageInst = window.localStorage
  }

  makeRequest = ( url, method, data = {} ) => this.axios( {
    url,
    method,
    data,
    headers: {
      Authorization: `Bearer ${ authToken }`,
    },
  } );

  getRequest = ( url, config ) => this.makeRequest( url, 'get', config );

  putRequest = ( url, config ) => this.makeRequest( url, 'put', config );

  postRequest = ( url, config ) => this.makeRequest( url, 'post', config );

  deleteRequest = ( url, config ) => this.makeRequest( url, 'delete', config );

  signup = ( body ) => this.postRequest( '/user/signup', body );

  emailVerification = async ( token ) => {
    const { data } = await this.getRequest( `/auth/verify-token/${ token }` )
    const { accessToken } = data.result
    this.localStorageInst.setItem( 'token', accessToken )
  };

  postSignUp = ( userType, step, body ) => this.postRequest( `/${ userType }/post-signup/step${ step }`, body );

  inviteRequest = ( methodType, { type, body } ) => this.makeRequest( `/user/${ type }`, methodType, body )
}

const axiosInst = axios.create( {
  baseURL,
} )

export default new ApiClient( axiosInst )
