$(document).ready(function() { 
  const pathName = window.location.pathname
  
  const token = cookieHelper.getToken()
  if (pathName.includes('/Flow') && !token) {
    redirectToLoginSite()
  }
  
  if (token) {
    $('.login').hide()
    $('.logout').show()
    const data = cookieHelper.getTokenData()
    if (data && data.full_name) {
      $('.fullname').text("Hi, " + data.full_name)
    }
  } else {
    cookieHelper.watchCookie()
    $('.fullname').empty()
    $('.logout').hide()
    $('.login').show()
  }
});

function logout() {
  axios({
    url: QUBICLE_BACKEND_URL + "api/v1/user/logout",
    method: 'post',
    withCredentials: true
  }).then(() => {
    console.log('User logged out successfully!!')
  }).catch((err) => {
    console.error('Error while executing the logout method!!', err)
  })
}