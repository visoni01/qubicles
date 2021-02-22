import React from 'react'
import PropTypes from 'prop-types'
import '../styles.scss'
import RenderPosts from '../../../Dashboard/ClientDashboard/Posts/RenderPosts'

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
