(function() {
  'use strict';
  const publicRoutes = ['/flow/view']
  const root = Function('return this')();

  function getCookie(name) {
    return Cookies.get(name)
  }

  function isPublicRoute() {
    let isPublicRoute = false;
    for (let index = 0; index < publicRoutes.length; index++) {
      if (window.location.pathname.includes(publicRoutes[index])) {
        isPublicRoute = true;
        break
      }
    }

    return isPublicRoute
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
        if (isPublicRoute()) {
          return
        }
        if (window.location.pathname.includes('/flow')) {
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
