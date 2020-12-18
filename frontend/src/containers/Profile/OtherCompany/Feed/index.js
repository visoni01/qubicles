import React from 'react'
import PropTypes from 'prop-types'
import RenderPosts from '../../../Dashboard/Posts/RenderPosts'
import '../styles.scss'

const OtherContactCenterFeed = ({ companyId }) => (
  <>
    {/* Render Posts */}
    <RenderPosts
      ownerId={ companyId }
    />
  </>
)

OtherContactCenterFeed.propTypes = {
  companyId: PropTypes.string.isRequired,
}

export default OtherContactCenterFeed
