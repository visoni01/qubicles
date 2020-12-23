import React, { useCallback } from 'react'
import { Box, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import JobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/JobsSkeleton'
import OtherCompanyOpenPositionsCard from './otherCompanyOpenPositionsCard'
import { jobsWithCategoriesFetchStart } from '../../../../redux-saga/redux/actions'

export default function OtherCompanyOpenPositionsList({ companyId }) {
  const { jobsWithCategories, isAllJobsFetched, isLoading } = useSelector((state) => state.jobsWithCategories)

  const dispatch = useDispatch()

  const fetchJobs = useCallback(() => {
    if (!isAllJobsFetched) {
      dispatch(jobsWithCategoriesFetchStart({
        clientId: companyId,
      }))
    }
  }, [ dispatch, companyId, isAllJobsFetched ])

  if (isLoading) {
    return <JobsSkeleton />
  }
  return (
    <Box className='custom-box'>
      <h3 className='h3 mb-20'> Open Positions </h3>
      {(
        jobsWithCategories.map((jobCategory) => (
          jobCategory.jobs.length && (
          <OtherCompanyOpenPositionsCard
            key={ jobCategory.categoryId }
            categoryId={ jobCategory.categoryId }
            categoryTitle={ jobCategory.categoryTitle }
            jobs={ jobCategory.jobs }
            inNeed={ jobCategory.needed }
            fulfilled={ 2 }
          />
          )))
        )}

      {!isAllJobsFetched && (
      <div className=' mt-20 mb-20 is-flex is-center'>
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
  companyId: PropTypes.string.isRequired,
}
