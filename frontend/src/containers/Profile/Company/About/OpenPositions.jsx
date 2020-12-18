import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newJobCategoriesFetchStart, updateJobsFilter } from '../../../../redux-saga/redux/actions'
import { jobFilterStatus } from '../../../NewPeople/ContactCenter/constants'
import RenderJobs from '../../../NewPeople/ContactCenter/Jobs/RenderJobs'

export default function OpenPositions() {
  const { status } = useSelector((state) => state.newJobCategories)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status !== 'recruiting') {
      dispatch(newJobCategoriesFetchStart({
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

  return (<RenderJobs />)
}
