import React, { useEffect } from 'react'
import {
  Avatar, Box, Button, Divider,
} from '@material-ui/core'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { carolin } from '../../assets/images/avatar/index'
import { topicCommentsFetchingStart, loadMoreComments } from '../../redux-saga/redux/actions'

const Comments = ({ topicId, commentsCount }) => {
  const dispatch = useDispatch()
  const { comments } = useSelector((state) => state.topicComments)

  const noOfCommentsPerReq = 10

  const handleMoreComments = () => (
    dispatch(loadMoreComments({
      topicId,
      limit: noOfCommentsPerReq,
      offset: comments.length,
    }))
  )

  useEffect(() => {
    dispatch(topicCommentsFetchingStart({
      topicId,
      limit: noOfCommentsPerReq,
      offset: comments.length || 0,
    }))
  }, [ dispatch, topicId ])

  return (
    <Box className='primary-box padding-20 comments-list'>
      <h3>
        Comments
      </h3>
      <div>
        {comments.length ? comments.map((comment, index) => (
          <>
            <div key={ comment.id } className='commentor-info'>
              <div className='display-inline-flex mb-10'>
                <Avatar className='mr-10' src={ carolin } />
                <div>
                  <p className='commentor-name'>
                    {comment.ownerName}
                  </p>
                  <p className='comment-date'>
                    {moment(comment.createdAt).format('MMMM DD YY hh:mm a')}
                  </p>
                </div>
              </div>
              <p className='comment-description'>
                {comment.comment}
              </p>
            </div>
            { (index + 1 < comments.length) && <Divider />}
          </>
        )) : (
          <h4 className='h4 text-align-center padding-20'>
            No comments to show
          </h4>
        )}
      </div>
      {(comments.length < commentsCount) && (
      <Button
        classes={ { root: 'load-more-comment' } }
        onClick={ handleMoreComments }
      >
        Load more comments
      </Button>
      )}
    </Box>
  )
}

Comments.propTypes = {
  topicId: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
}

export default Comments
