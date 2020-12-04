import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import JobCategoryCard from './JobCategoryCard'
import JobsSkeleton from '../SkeletonLoader/JobsSkeleton'

export default function RenderJobs() {
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)

  if (isLoading) {
    return (
      <>
        <JobsSkeleton />
      </>
    )
  }

  return (
    <Box className='custom-box'>
      { newJobCategories.map((jobCategory) => (
        jobCategory.jobs.length > 0 && (
        <JobCategoryCard
          key={ jobCategory.categoryId }
          categoryId={ jobCategory.categoryId }
          categoryTitle={ jobCategory.categoryTitle }
          jobs={ jobCategory.jobs }
          inNeed={ jobCategory.needed }
          fulfilled={ 2 }
          evaluating={ 2 }
          pending={ 0 }
        />
        )))}
    </Box>
  )
}
