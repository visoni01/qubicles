import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import './style.scss'
import { postDataFechingStart } from '../../redux-saga/redux/actions'
import Loader from '../loaders/circularLoader'
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
      <Loader
        className='loader-custom'
        enableOverlay={ false }
        displayLoaderManually
      />
    )
  }
  if (isPosts) {
    return (posts.map((post) => <PostStatusWrap { ...post } key={ posts.userActivityId } />))
  }

  return (
    <div className='post-item animated preFadeInLeft fadeInLeft'>
      No status update...
    </div>
  )
}

export default PostsList
