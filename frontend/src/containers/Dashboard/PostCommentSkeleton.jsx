import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const PostCommentSkeleton = () => (

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
      <Skeleton animation='wave' classes={ { root: 'custom-skeleton-description' } } />
    </div>

  </div>

)

export default PostCommentSkeleton
