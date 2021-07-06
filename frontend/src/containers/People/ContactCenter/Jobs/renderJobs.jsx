import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import JobCategoryCard from '../../../../components/People/ContactCenter/Jobs/jobCategoryCard'
import JobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/Jobs/jobsSkeleton'
import './styles.scss'

const RenderJobs = () => {
  const { jobsWithCategories, isLoading } = useSelector((state) => state.jobsWithCategories)
  const { statusTitle } = useSelector((state) => state.jobsWithCategories)

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <h3 className='h3 mb-20'>
          {`${ statusTitle }`}
        </h3>
        <JobsSkeleton />
      </Box>
    )
  }

  return (
    <Box className='custom-box'>
      <h3 className='h3 mb-20'>
        {`${ statusTitle }`}
      </h3>

      { jobsWithCategories.map((jobCategory) => (
        jobCategory.jobs.length > 0 && (
          <>
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
          </>
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

export default RenderJobs
