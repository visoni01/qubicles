import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import CompanyFilter from './companyFilter'
import CompanyCoursesWrap from './companyCoursesWrap'
import { companyCoursesFetchStart, resetCompanyCoursesReducer } from '../../../../../redux-saga/redux/people'

const CompanyCourses = () => {
  const { companyId, courseFilter, offset } = useSelector((state) => state.companyCourses)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(companyCoursesFetchStart({ companyId, courseFilter, offset }))

    return () => {
      dispatch(resetCompanyCoursesReducer())
    }
  }, [ dispatch, companyId, courseFilter, offset ])

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
        <CompanyFilter />
      </Grid>
      <Grid item xl={ 9 } lg={ 9 } md={ 12 } sm={ 12 } xs={ 12 }>
        <CompanyCoursesWrap />
      </Grid>
    </Grid>
  )
}

export default CompanyCourses
