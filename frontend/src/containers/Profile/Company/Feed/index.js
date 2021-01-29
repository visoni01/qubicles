import React from 'react'
import { useSelector } from 'react-redux'

import '../styles.scss'
import CreatePost from '../../../Dashboard/ClientDashboard/Posts/CreatePost'
import RenderPosts from '../../../Dashboard/ClientDashboard/Posts/RenderPosts'

const ContactCenterFeed = () => {
  const { userDetails } = useSelector((state) => state.login)

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
