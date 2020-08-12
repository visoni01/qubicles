import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import './style.scss'
import Skeleton from '@material-ui/lab/Skeleton'
import { postDataFechingStart } from '../../redux-saga/redux/actions'
import PostStatusWrap from './PostStatusWrap'

const PostsList = () => {
  const { posts, isLoading } = useSelector((state) => state.statusPosts)
  const isPosts = !_.isEmpty(posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postDataFechingStart())
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
      </div>
    )
  }

  if (isPosts) {
    return (posts.map((post) => <PostStatusWrap { ...post } key={ posts.userActivityId } />))
  }

  return (
    <> </>
  )
}

export default PostsList
