import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Button } from '@material-ui/core'
import RenderPostComments from './renderPostComments'
import Loader from '../../../loaders/circularLoader'
import { commentsArrayValidator } from '../postValidators'

const PostCommentsWrap = ({
  postId, comments, commentsCount, loadMoreCommentsCB, isCommentLoading,
}) => (
  <>
    <div className='mb-10'>
      <Divider />
    </div>
    {comments.length < commentsCount && (
      <div className='view-more-comments-section'>
        <Button
          disableRipple
          onClick={ loadMoreCommentsCB }
        >
          View More Comments
        </Button>
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
    <div className='mt-15 pl-5'>
      {comments.map((comment) => (
        <RenderPostComments
          postId={ postId }
          key={ comment.user_activity_id }
          commentText={ comment.activity_value }
          ownerName={ comment.owner }
          ownerId={ comment.owner_id }
          profilePic={ comment.profilePic }
          createdAt={ comment.createdAt }
          updatedAt={ comment.updatedAt && comment.updatedAt.toString() }
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
