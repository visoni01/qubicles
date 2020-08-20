import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const skeletons = [ 1, 2, 3, 4 ]
const CommentSkeleton = () => (
  <>
    {
      skeletons.map((index) => (
        <div className='comment-section skeleton-root' key={ `${ index } + skeleton` }>
          <div className='avatar-parent'>
            <Skeleton
              animation='wave'
              variant='circle'
              classes={ { root: 'custom-skeleton-comment-img' } }
            />
          </div>
          <div className='comment-body'>
            <div className='username'>
              <Skeleton
                animation='wave'
                classes={ { root: 'custom-skeleton-comment-title' } }
              />
            </div>
            <p>
              <Skeleton
                animation='rect'
                classes={ { root: 'custom-skeleton-like-comment' } }
              />
              <Skeleton
                animation='rect'
                classes={ { root: 'custom-skeleton-like-comment' } }
              />
            </p>
          </div>
        </div>
      ))
    }
  </>
)

export default CommentSkeleton
