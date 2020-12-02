import React, { useCallback } from 'react'
import {
  Box, InputBase, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import JobCategoryCard from './JobCategoryCard'
import ROUTE_PATHS from '../../../../routes/routesPath'
import { resetJobDetails } from '../../../../redux-saga/redux/actions'
import JobsSkeleton from '../SkeletonLoader/JobsSkeleton'

const JobsPage = ({ searchField, setSearchField }) => {
  const history = useHistory()
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)
  const dispatch = useDispatch()

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchField(nextValue)
  }, [ ])

  const handleNewJob = () => {
    history.push(ROUTE_PATHS.NEW_JOB)
    dispatch(resetJobDetails())
  }

  if (isLoading) {
    return (
      <>
        <JobsSkeleton />
      </>
    )
  }

  return (
    <>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <div className='search-input'>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
          <InputBase
            placeholder='Search Jobs'
            className='input-field'
            onChange={ handleSearch }
            value={ searchField }
          />
        </div>
        <Button
          className='search-button'
          onClick={ handleNewJob }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          New Job
        </Button>
      </div>
      <Box className='custom-box'>
        { newJobCategories.map((jobCategory) => (
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
      </Box>
    </>
  )
}

JobsPage.defaultProps = {
  searchField: '',
}

JobsPage.propTypes = {
  searchField: PropTypes.string,
  setSearchField: PropTypes.func.isRequired,
}

export default JobsPage
