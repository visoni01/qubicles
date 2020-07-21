;(function() {
  'use strict';
  // let cookieValid;
  const root = Function('return this')();
  
  function getCookie(name) {
    return Cookies.get(name)
  }
  
  function getToken() {
    // Get cookie using our custom function
    return getCookie("access_token") || null;
  }

  function watchCookie() {
    setTimeout(() => {
      if (getToken()) {
        if ($('.login').is(':visible')) {
          refreshPage()
        }
        watchCookie()
      } else {
        if (window.location.pathname.includes('/Flow')) {
          return redirectToLoginSite()
        }
        refreshPage()
      }
    }, 1000)
  }

  function getTokenData(token) {
    token = token || getToken()
    watchCookie()
    // atob is used for decode the base64 String
    return JSON.parse(atob(token.split('.')[1]));
  }

  root.cookieHelper = {
    watchCookie,
    getCookie,
    getToken,
    getTokenData
  }

}.call(this));  
