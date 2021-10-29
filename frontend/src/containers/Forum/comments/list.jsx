import React, { useEffect } from 'react'
import {
  Box, Button, Divider,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { topicCommentsFetchingStart, loadMoreComments } from '../../../redux-saga/redux/actions'
import ListSkeleton from '../../../components/Forum/Skeletons/commentsList'
import Comment from './listItem'

const Comments = ({ topicId, commentsCount }) => {
  const { comments, isLoading } = useSelector((state) => state.topicComments)

  const dispatch = useDispatch()
  const noOfCommentsPerReq = 10

  useEffect(() => {
    dispatch(topicCommentsFetchingStart({
      topicId,
      limit: noOfCommentsPerReq,
      offset: 0,
    }))
  }, [ dispatch, topicId ])

  const handleMoreComments = () => (
    dispatch(loadMoreComments({
      topicId,
      limit: noOfCommentsPerReq,
      offset: comments.length,
    }))
  )

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <ListSkeleton />
      </Box>
    )
  }

  return (
    <Box className='custom-box comments-list'>
      <h3 className='h3'> Comments </h3>
      <div>
        {comments.length ? comments.map((comment, index) => (
          <div key={ comment.id }>
            <Comment comment={ comment } />
            { (index + 1 < comments.length) && <Divider />}
          </div>
        )) : (
          <h4 className='h4 text-center padding-20'> No comments to show </h4>
        )}
      </div>
      {(comments.length < commentsCount) && (
        <Button
          classes={ { root: 'text-link-underlined' } }
          onClick={ handleMoreComments }
          fullWidth
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
