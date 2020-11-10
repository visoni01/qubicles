import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { formatDate } from '../../../utils/common'
import { terry } from '../../../assets/images/avatar'

const RenderPostComments = ({
  commentText, ownerName, createdAt,
}) => (
  <div>
    <div className='display-inline-flex mt-10'>
      <Avatar className='comment-avatar' alt='Remy Sharp' src={ terry } />
      <div>
        <h4 className='h4'>
          {ownerName}
        </h4>
        <p className='para light sz-sm'>
          {formatDate(createdAt, 'MMMM DD YYYY, hh:mm a')}
        </p>
        <p className='para mb-10'>
          {commentText}
        </p>
      </div>
    </div>
  </div>
)
RenderPostComments.propTypes = {
  commentText: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default React.memo(RenderPostComments)
