import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import { postDataFetchingStart } from '../../../../redux-saga/redux/actions'
import PostWrap from './postWrap'
import PostSkeleton from './postSkeleton'

const RenderPosts = ({ ownerId }) => {
  const { posts, isLoading } = useSelector((state) => state.statusPosts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postDataFetchingStart({ ownerId }))
  }, [ dispatch, ownerId ])

  if (isLoading) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    )
  }

  return (
    posts.length > 0 ? (
      posts.map((post) => (
        <PostWrap
          userActivityId={ post.user_activity_id }
          activityValue={ post.activity_value }
          activityCustom={ post.activity_custom }
          permission={ post.activity_permission }
          createdAt={ post.createdAt && post.createdAt.toString() }
          updatedAt={ post.updatedAt && post.updatedAt.toString() }
          owner={ post.owner }
          userId={ post.user_id }
          isPostLiked={ post.isPostLiked }
          likesCount={ post.likesCount }
          commentsCount={ post.commentsCount }
          key={ post.user_activity_id }
          comments={ post.comments }
          commentLoading={ post.commentLoading }
        />
      ))
    ) : (
      <Box className='custom-box'>
        <h3 className='h3 text-center'>No Posts Yet</h3>
      </Box>
    )
  )
}

RenderPosts.defaultProps = {
  ownerId: null,
}

RenderPosts.propTypes = {
  ownerId: PropTypes.number,
}

export default RenderPosts
