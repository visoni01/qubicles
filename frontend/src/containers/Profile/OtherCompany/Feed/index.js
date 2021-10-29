import React from 'react'
import PropTypes from 'prop-types'
import RenderPosts from '../../../Dashboard/ClientDashboard/Posts/renderPosts'
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
  companyId: PropTypes.number.isRequired,
}

export default OtherContactCenterFeed
