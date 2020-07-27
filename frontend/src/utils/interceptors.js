export const handleResponse = (response) => {
  response.data = response.data.data
  response.message = response.data.message
  return response
}

export const handleReponseError = (error) => {
  const { response } = error
  const { data } = response
  let errMsg
  if (data && data.message) {
    errMsg = response.data.message
  }
  return Promise.reject(errMsg)
}
