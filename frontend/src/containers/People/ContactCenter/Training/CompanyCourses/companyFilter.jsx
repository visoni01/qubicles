import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box, Button, List, ListItemText, MenuItem,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import JobFilterSkeleton from '../../../../../components/People/ContactCenter/SkeletonLoader/Jobs/jobsFilterSkeleton'
import { companiesListFetchStart, updateCompanyCoursesFilter } from '../../../../../redux-saga/redux/people'

const CompanyFilter = () => {
  const { isLoading, companiesList } = useSelector((state) => state.companiesList)
  const { companyId, companyName } = useSelector((state) => state.companyCourses)

  const [ selectedCompany, setSelectedCompany ] = useState(companyId)
  const [ selectedCompanyName, setSelectedCompanyName ] = useState(companyName)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEmpty(companiesList) && _.isNull(isLoading)) {
      dispatch(companiesListFetchStart())
    }
  }, [ dispatch, companiesList, isLoading ])

  useEffect(() => {
    dispatch(updateCompanyCoursesFilter({
      companyId: selectedCompany,
      companyName: selectedCompanyName,
      currentPage: 1,
    }))
  }, [ dispatch, selectedCompany, selectedCompanyName ])

  const handleCoursesByCompany = useCallback(({ company }) => {
    setSelectedCompany(company.companyId)
    setSelectedCompanyName(company.companyName)
  }, [])

  const handleResetCompany = useCallback(() => {
    setSelectedCompany(0)
    setSelectedCompanyName('All')
  }, [])

  return (
    <Box className='custom-box no-padding'>
      <Button
        onClick={ () => history.push(ROUTE_PATHS.PEOPLE_TRAINING_TAB) }
        className='ml-25 mt-20'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        <FontAwesomeIcon icon={ faChevronLeft } className='custom-fa-icon white mr-10' />
        All Courses
      </Button>

      <h3 className='h3 category-heading'>Company Courses</h3>

      {isLoading
        ? <JobFilterSkeleton />
        : (
          <List className='filter-list-items'>
            <MenuItem
              button
              onClick={ handleResetCompany }
              selected={ selectedCompany === 0 }
            >
              <ListItemText classes={ { primary: 'list-item' } }>
                <h4 className='h4 light unbold'>All</h4>
              </ListItemText>
            </MenuItem>

            {companiesList?.map((company) => (
              <MenuItem
                button
                key={ company.companyId }
                selected={ selectedCompany === company.companyId }
                onClick={ () => handleCoursesByCompany({ company }) }
              >
                <ListItemText classes={ { primary: 'list-item' } }>
                  <h4 className='h4 light unbold'>{company.companyName}</h4>
                </ListItemText>
              </MenuItem>
            ))}
          </List>
        )}
    </Box>
  )
}

export default CompanyFilter
