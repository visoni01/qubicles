import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { useSelector } from 'react-redux'
import JobCategoryCard from './JobCategoryCard'
import JobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/JobsSkeleton'

export default function RenderJobs() {
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)
  const { statusTitle } = useSelector((state) => state.newJobCategories)

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <JobsSkeleton />
      </Box>
    )
  }

  return (
    <Box className='custom-box'>
      <div>
        <h3 className='h3 light'>
          {`${ statusTitle }`}
        </h3>
        <Divider className='divider' />
      </div>
      { newJobCategories.map((jobCategory) => (
        jobCategory.jobs.length && (
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
      {newJobCategories && newJobCategories.length === 0 && (
      <div className='mt-10 mb-10'>
        <div className='text-align-last-center'>
          <h3 className=' h3'>No jobs found!</h3>
        </div>
      </div>
      )}
    </Box>
  )
}
