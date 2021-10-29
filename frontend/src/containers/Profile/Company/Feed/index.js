import React from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../../../Dashboard/ClientDashboard/Posts/createPost'
import RenderPosts from '../../../Dashboard/ClientDashboard/Posts/renderPosts'
import '../styles.scss'

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
