import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { jobsWithCategoriesFetchStart, updateJobsFilter } from '../../../../redux-saga/redux/actions'
import { jobFilterStatus } from '../../../People/ContactCenter/constants'
import RenderJobs from '../../../People/ContactCenter/Jobs/renderJobs'
import '../../../People/ContactCenter/Talent/styles.scss'

const OpenPositions = () => {
  const { status } = useSelector((state) => state.jobsWithCategories)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status !== 'recruiting') {
      dispatch(jobsWithCategoriesFetchStart({
        categoryId: 0,
        searchKeyword: '',
        status: 'recruiting',
      }))

      dispatch(updateJobsFilter({
        categoryId: 0,
        searchKeyword: '',
        status: 'recruiting',
        statusTitle: jobFilterStatus.recruiting,
      }))
    }
    // eslint-disable-next-line
  }, [ dispatch ])

  return <RenderJobs />
}

export default OpenPositions
