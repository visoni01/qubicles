import React from 'react'
import SuggestedUserCardSkeleton from './suggestedUserCardSkeleton'
import './styles.scss'

const SuggestedUsersSkeleton = () => (
  <>
    {[ ...Array(3).keys() ].map((val) => (
      <SuggestedUserCardSkeleton
        key={ val }
      />
    ))}
  </>
)

export default SuggestedUsersSkeleton
