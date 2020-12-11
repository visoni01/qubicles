import React from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../../../Dashboard/Posts/CreatePost'
import RenderPosts from '../../../Dashboard/Posts/RenderPosts'
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
