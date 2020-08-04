export const handleResponse = (response) => {
  response.message = response.data.message
  response.data = response.data.data
  return response
}

export const handleReponseError = (error) => {
  const { response } = error
  const { data } = response
  let errMsg
  if (data && data.error) {
    errMsg = response.data.message || response.data.error
  }
  return Promise.reject(errMsg)
}
