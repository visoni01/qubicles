import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const GroupList = () => (
  <>
    <Skeleton
      animation='wave'
      variant='text'
      width={ 120 }
      height={ 50 }
    />
    {[ ...Array(5).keys() ].map((key) => (
      <Skeleton
        key={ key }
        animation='wave'
        className='mt-10 mb-10'
        height={ 30 }
      />
    ))}
  </>
)

export default GroupList
