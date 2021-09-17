import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from '@material-ui/lab'

const SelfMessageSkeleton = ({ height }) => (
  <div className='message self-message'>
    <Skeleton
      animation='wave'
      classes={ { root: `text mr-10 ${ height }` } }
    />
    <Skeleton
      animation='wave'
      variant='circle'
      classes={ { root: 'profile-picture' } }
    />
  </div>
)

SelfMessageSkeleton.propTypes = {
  height: PropTypes.string.isRequired,
}

export default SelfMessageSkeleton
