import React, { useCallback } from 'react'
import { Box, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import JobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/Jobs/jobsSkeleton'
import OtherCompanyOpenPositionsCard from './otherCompanyOpenPositionsCard'
import { jobsWithCategoriesFetchStart } from '../../../../redux-saga/redux/actions'

const OtherCompanyOpenPositionsList = ({ companyId }) => {
  const { jobsWithCategories, isAllJobsFetched, isLoading } = useSelector((state) => state.jobsWithCategories)
  const dispatch = useDispatch()

  const fetchJobs = useCallback(() => {
    if (!isAllJobsFetched && companyId) {
      dispatch(jobsWithCategoriesFetchStart({
        clientId: companyId,
        status: 'recruiting',
      }))
    }
  }, [ dispatch, companyId, isAllJobsFetched ])

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <JobsSkeleton />
      </Box>
    )
  }

  return (
    <Box className='custom-box'>
      <h3 className='h3 mb-20'> Open Positions </h3>

      {jobsWithCategories.map((jobCategory) => (
        jobCategory.jobs.length && (
          <OtherCompanyOpenPositionsCard
            key={ jobCategory.categoryId }
            categoryId={ jobCategory.categoryId }
            categoryTitle={ jobCategory.categoryTitle }
            jobs={ jobCategory.jobs }
            inNeed={ jobCategory.needed }
            fulfilled={ 2 }
          />
        )))}

      {((jobsWithCategories && jobsWithCategories.length === 0) || (jobsWithCategories[ 0 ].jobs.length === 0)) && (
        <div className='mt-10 mb-10'>
          <div className='text-align-last-center'>
            <h3 className=' h3'>No jobs found!</h3>
          </div>
        </div>
      )}

      {!isAllJobsFetched && jobsWithCategories.length > 0 && (
      <div className=' mt-20 is-flex is-center'>
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
          onClick={ fetchJobs }
        >
          View All Open Positions
        </Button>
      </div>
      )}
    </Box>
  )
}

OtherCompanyOpenPositionsList.propTypes = {
  companyId: PropTypes.number.isRequired,
}

export default OtherCompanyOpenPositionsList
