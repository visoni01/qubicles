import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postDataFetchingStart } from '../../redux-saga/redux/actions'
import PostStatusWrap from './PostStatusWrap'

const RenderPosts = () => {
  const { posts, isLoading } = useSelector((state) => state.statusPosts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postDataFetchingStart())
  }, [ dispatch ])

  if (isLoading) {
    return (<> Empty posts</>)
  }

  return (
    posts.map((post) => (
      <PostStatusWrap
        userActivityId={ post.user_activity_id }
        activityValue={ post.activity_value }
        activityCustom={ post.activity_custom }
        createdAt={ post.createdAt }
        owner={ post.owner }
        userId={ post.user_id }
        isPostLiked={ post.isPostLiked }
        likesCount={ post.likesCount }
        commentsCount={ post.commentsCount }
        key={ post.user_activity_id }
        comments={ post.comments }
        commentLoading={ post.commentLoading }
      />
    )))
}

export default RenderPosts
