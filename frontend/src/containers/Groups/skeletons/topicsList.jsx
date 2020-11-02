import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const TopicsList = () => (
  <>
    <Skeleton
      animation='wave'
      variant='text'
      width={ 150 }
      height={ 50 }
    />
    <div className='mt-10'>
      {[ ...Array(8).keys() ].map((key) => (
        <div key={ key } className='display-inline-flex width-100-per'>
          <Skeleton
            animation='wave'
            className='mr-10 mt-10'
            height={ 40 }
            width={ 40 }
            variant='circle'
          />
          <div className='width-100-per'>
            <Skeleton
              animation='wave'
              className='mb-10'
              height={ 30 }
              width={ 150 }
              variant='text'
            />
            <Skeleton
              animation='wave'
              className='mb-10'
              width={ 250 }
              variant='text'
            />
          </div>
        </div>
      ))}
    </div>
  </>
)

export default TopicsList
