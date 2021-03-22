import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { useSelector } from 'react-redux'
import JobCategoryCard from './JobCategoryCard'
import JobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/jobsSkeleton'

export default function RenderJobs() {
  const { jobsWithCategories, isLoading } = useSelector((state) => state.jobsWithCategories)
  const { statusTitle } = useSelector((state) => state.jobsWithCategories)

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <h3 className='h3 light'>
          {`${ statusTitle }`}
        </h3>
        <Divider className='divider' />
        <JobsSkeleton />
      </Box>
    )
  }

  return (
    <Box className='custom-box'>
      <h3 className='h3 light'>
        {`${ statusTitle }`}
      </h3>
      <Divider className='divider' />

      { jobsWithCategories.map((jobCategory) => (
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
      {((jobsWithCategories && jobsWithCategories.length === 0) || (jobsWithCategories[ 0 ].jobs.length === 0)) && (
      <div className='mt-10 mb-10'>
        <div className='text-align-last-center'>
          <h3 className=' h3'>No jobs found!</h3>
        </div>
      </div>
      )}
    </Box>
  )
}
