import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from '../../../Dashboard/Posts/CreatePost'
import RenderPosts from '../../../Dashboard/Posts/RenderPosts'
import { dashboardDataFetchingStart } from '../../../../redux-saga/redux/actions'
import '../styles.scss'

const ContactCenterFeed = () => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)

  // Fetching dashboard data
  useEffect(() => {
    dispatch(dashboardDataFetchingStart())
  }, [ dispatch ])
  return (
    <>
      {/* Create new post */}
      <CreatePost />
      {/* Render Posts */}
      <RenderPosts
        ownerId={ userDetails.user_id }
      />
    </>
  )
}

export default ContactCenterFeed
