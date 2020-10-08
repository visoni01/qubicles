import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import RenderPostComments from './RenderPostComments'
import Loader from '../../components/loaders/circularLoader'

const PostComments = ({
  comments, commentsCount, loadMoreCommentsCB, isCommentLoading,
}) => (
  <>
    {!_.isEmpty(comments) && <Divider />}
    {comments.length < commentsCount && (
      <div className='load-comments'>
        <p onClick={ loadMoreCommentsCB }>View more comments</p>
        {isCommentLoading && (
        <Loader
          className='view-more-comments-loader'
          displayLoaderManually
          enableOverlay={ false }
          size={ 23 }
        />
        )}
      </div>
    )}
    <div className='comments-body'>
      {comments.map((comment) => (
        <RenderPostComments
          key={ comment.user_activity_id }
          commentText={ comment.activity_value }
          ownerName={ comment.owner }
          ownerId={ comment.owner_id }
          createdAt={ comment.createdAt }
          userActivityId={ comment.user_activity_id }
        />
      ))}
    </div>
  </>
)

PostComments.propTypes = {
  comments: PropTypes.array.isRequired,
  commentsCount: PropTypes.number.isRequired,
  loadMoreCommentsCB: PropTypes.func.isRequired,
  isCommentLoading: PropTypes.bool.isRequired,
}
export default PostComments
