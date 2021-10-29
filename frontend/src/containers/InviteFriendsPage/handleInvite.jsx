import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInviterDetailsStart } from '../../redux-saga/redux/actions'
import ROUTE_PATHS from '../../routes/routesPath'

const HandleInvite = () => {
  const { isLoading } = useSelector((state) => state.signupWithInvite)

  const { walletId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInviterDetailsStart({ walletId }))
  }, [ dispatch, walletId ])

  return (
    <>
      {!isLoading && <Redirect to={ ROUTE_PATHS.SIGN_UP } />}
    </>
  )
}

export default HandleInvite
