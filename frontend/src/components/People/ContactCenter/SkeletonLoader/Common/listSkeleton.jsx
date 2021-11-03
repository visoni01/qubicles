import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'

const ListSkeleton = () => (
  <div className='list-skeleton-container'>
    {[ ...Array(5).keys() ].map((key) => (
      <Skeleton
        key={ key }
        animation='wave'
        classes={ { root: 'custom-skeleton-side-filter' } }
      />
    ))}
  </div>
)

export default ListSkeleton
