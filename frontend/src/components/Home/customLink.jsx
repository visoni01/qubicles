import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isExternal from 'is-url-external'

/**
 * Link that also works for external URL's
 */

const CustomLink = (props) => {
  const { to } = props
  return (
    isExternal(to) ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        href={ to }
        { ...props }
      />
    ) : <Link { ...props } />
  )
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default CustomLink
