import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const CommentsList = () => (
  <>
    <Skeleton
      animation='wave'
      variant='text'
      width={ 150 }
      height={ 50 }
    />
    <div className='mt-10'>
      {[ ...Array(8).keys() ].map((key) => (
        <div key={ key }>
          <div key={ key } className='display-inline-flex is-fullwidth'>
            <Skeleton
              animation='wave'
              className='mr-10 mt-10'
              height={ 40 }
              width={ 40 }
              variant='circle'
            />
            <div className='is-fullwidth'>
              <Skeleton
                animation='wave'
                className='mb-10'
                height={ 30 }
                width={ 150 }
              />
              <Skeleton
                animation='wave'
                className='mb-10'
                width={ 250 }
              />
            </div>
          </div>
          <Skeleton
            animation='wave'
            className='mb-20'
            height={ 30 }
          />
        </div>
      ))}
    </div>
  </>
)

export default CommentsList
