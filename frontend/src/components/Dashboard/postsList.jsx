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
      <>
        <Skeleton animation='wave' variant='circle' width={ 40 } height={ 40 } styel={ { marginTop: 20 } } />
        <Skeleton
          animation='wave'
          height='20px'
          width='70%'
          style={ { marginLeft: 50, marginBottom: 10, paddingBottom: 30 } }
        />
        <Skeleton animation='wave' height='40px' style={ { marginBottom: 6 } } />
        <Skeleton
          animation='wave'
          variant='rect'
          height={ 350 }
          style={ { marginBottom: 10 } }
        />
      </>
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
