import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { Box } from '@material-ui/core'

const PostSkeleton = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
  const isPhotoPost = getRandomInt(2) === 1

  return (
    <Box className='box'>
      <div className='post-skeleton-container'>
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
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-description' } } />
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-description' } } />
        {isPhotoPost
          && <Skeleton animation='wave' classes={ { root: 'custom-skeleton-photo' } } />}
        <div className='icon-tray'>
          <Skeleton animation='wave' classes={ { root: 'icon-option' } } />
          <Skeleton animation='wave' classes={ { root: 'icon-option' } } />
          <Skeleton animation='wave' classes={ { root: 'icon-option' } } />
        </div>
      </div>
    </Box>
  )
}

export default PostSkeleton
