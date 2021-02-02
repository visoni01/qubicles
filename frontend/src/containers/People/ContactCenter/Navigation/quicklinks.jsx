import React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

const Quicklinks = ({
  quickLinks,
}) => (
  <div>
    <h4 className='h4 mb-10'>Quick Links</h4>
    {quickLinks.map((item) => (
      <div key={ item.id }>
        {item.hasBreak && (
          <Divider className='divider' />
        )}
        {item.link ? (
          <Link to={ item.link }>
            <p className='primary-text-link mb-5'>
              {item.title}
            </p>
          </Link>
        ) : (
          <p className='primary-text-link mb-5'>
            {item.title}
          </p>
        )}
      </div>
    ))}
  </div>
)

Quicklinks.propTypes = {
  quickLinks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    hasBreak: PropTypes.bool.isRequired,
    link: PropTypes.string,

  })).isRequired,
}

export default Quicklinks
