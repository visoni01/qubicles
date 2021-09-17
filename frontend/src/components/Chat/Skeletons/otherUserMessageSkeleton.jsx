import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from '@material-ui/lab'

const OtherUserMessageSkeleton = ({ height }) => (
  <div className='message mt-20 no-margin-bottom'>
    <Skeleton
      animation='wave'
      variant='circle'
      classes={ { root: 'profile-picture' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: `text ml-10 ${ height }` } }
    />
  </div>
)

OtherUserMessageSkeleton.propTypes = {
  height: PropTypes.string.isRequired,
}

export default OtherUserMessageSkeleton
