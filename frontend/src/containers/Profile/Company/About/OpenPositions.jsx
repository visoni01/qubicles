import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import JobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/JobsSkeleton'
import JobCategoryCard from '../../../NewPeople/ContactCenter/Jobs/JobCategoryCard'
import { newJobCategoriesFetchStart } from '../../../../redux-saga/redux/actions'
import OpenJobPositionCard from './OpenJobPositionCard'

export default function OpenPositions() {
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEmpty(newJobCategories)) { dispatch(newJobCategoriesFetchStart({ categoryId: 0, searchKeyword: '' })) }
  }, [ dispatch ])

  return (
    <Box className='custom-box'>
      <h3 className='h3 mb-30'> Open Positions </h3>
      {!isLoading ? (
        newJobCategories.map((jobCategory) => (
          jobCategory.jobs.length && (
          <OpenJobPositionCard
            key={ jobCategory.categoryId }
            categoryId={ jobCategory.categoryId }
            categoryTitle={ jobCategory.categoryTitle }
            jobs={ jobCategory.jobs }
            inNeed={ jobCategory.needed }
            fulfilled={ 2 }
            evaluating={ 2 }
            pending={ 0 }
          />
          )))
      ) : (
        <JobsSkeleton />
      )}
    </Box>
  )
}
