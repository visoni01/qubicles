import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Divider, Button } from '@material-ui/core'
import RenderPostComments from './RenderPostComments'
import Loader from '../../../components/loaders/circularLoader'
import { commentsArrayValidator } from '../postValidators'

const PostCommentsWrap = ({
  postId, comments, commentsCount, loadMoreCommentsCB, isCommentLoading,
}) => (
  <>
    {!_.isEmpty(comments) && <Divider />}
    {comments.length < commentsCount && (
      <div className='view-more-comments-section'>
        <Button
          disableRipple
          onClick={ loadMoreCommentsCB }
        >
          View More Comments
        </Button>
        {/* <p onClick={ loadMoreCommentsCB }>View more comments</p> */}
        {isCommentLoading && (
        <Loader
          className='static-small-loader mr-10'
          enableOverlay={ false }
          displayLoaderManually
          size={ 23 }
        />
        )}
      </div>
    )}
    <div className='mt-10'>
      {comments.map((comment) => (
        <RenderPostComments
          postId={ postId }
          key={ comment.user_activity_id }
          commentText={ comment.activity_value }
          ownerName={ comment.owner }
          ownerId={ comment.owner_id }
          createdAt={ comment.createdAt }
          updatedAt={ comment.updatedAt }
          commentId={ comment.user_activity_id }
        />
      ))}
    </div>
  </>
)

PostCommentsWrap.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: commentsArrayValidator.isRequired,
  commentsCount: PropTypes.number.isRequired,
  loadMoreCommentsCB: PropTypes.func.isRequired,
  isCommentLoading: PropTypes.bool.isRequired,
}
export default PostCommentsWrap
