import React from 'react'
import LeftUserCardSkeleton from './leftUserCardSkeleton'
import './styles.scss'

const LeftSectionSkeleton = () => (
  <>
    {[ ...Array(3).keys() ].map((val) => (
      <LeftUserCardSkeleton
        key={ val }
      />
    ))}
  </>
)

export default LeftSectionSkeleton
