import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import JobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/JobsSkeleton'
import OtherCompanyOpenPositionsCard from './otherCompanyOpenPositionsCard'

export default function OtherCompanyOpenPositionsList() {
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)

  if (isLoading) {
    return <JobsSkeleton />
  }

  return (
    <Box className='custom-box'>
      <h3 className='h3 mb-20'> Open Positions </h3>
      {(
        newJobCategories.map((jobCategory) => (
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
      <div className=' mt-20 mb-20 is-flex is-center'>
        <Button classes={ {
          root: 'button-primary-text',
          label: 'button-primary-text-label',
        } }
        >
          View All Open Positions
        </Button>
      </div>

    </Box>
  )
}
