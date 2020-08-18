import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import './style.scss'
import Skeleton from '@material-ui/lab/Skeleton'
import { postDataFetchingStart } from '../../redux-saga/redux/actions'
import PostStatusWrap from './PostStatusWrap'

const PostsList = () => {
  const { posts, isLoading } = useSelector((state) => state.statusPosts)
  const isPosts = !_.isEmpty(posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postDataFetchingStart())
  }, [ dispatch ])

  if (isLoading) {
    return (
      <div className='post-item post-item-custom animated preFadeInLeft fadeInLeft'>
        <div className='skeleton-header-container'>
          <div className='skeleton-avatar-container'>
            <Skeleton
              classes={ { root: 'custom-skeleton-avatar' } }
              animation='wave'
              variant='circle'
            />
          </div>
          <div className='skeleton-title-container'>
            <Skeleton
              animation='wave'
              classes={ { root: 'custom-skeleton-title' } }
            />
            <Skeleton animation='wave' classes={ { root: 'custom-skeleton-date' } } />
          </div>

          <Skeleton animation='wave' classes={ { root: 'custom-skeleton-description' } } />
        </div>
        <Skeleton
          animation='wave'
          variant='rect'
          classes={ { root: 'skeleton-footer-container' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'custom-skeleton-like-comment' } }
        />
      </div>
    )
  }

  if (isPosts) {
    return (posts.map((post) => (
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
      />
    )))
  }

  return (
    <> </>
  )
}

export default PostsList
