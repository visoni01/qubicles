import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import CreatePost from '../../../Dashboard/ClientDashboard/Posts/createPost'
import RenderPosts from '../../../Dashboard/ClientDashboard/Posts/renderPosts'

const ContactCenterFeed = ({ userId }) => {
  const { userDetails } = useSelector((state) => state.login)

  return (
    <>
      {/* Create new post */}
      {userId === userDetails.user_id && <CreatePost />}
      {/* Render Posts */}
      <RenderPosts
        ownerId={ userId }
      />
    </>
  )
}

ContactCenterFeed.propTypes = {
  userId: PropTypes.number.isRequired,
}

export default ContactCenterFeed
