import React, { useCallback, useState } from 'react'
import {
  Box, InputBase, Button, debounce,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { jobsCards } from '../testData'
import JobCategoryCard from './JobCategoryCard'
import ROUTE_PATHS from '../../../../routes/routesPath'
import { newJobCategoriesFetchStart } from '../../../../redux-saga/redux/actions'

const JobsPage = () => {
  const history = useHistory()
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)
  const [ searchField, setSearchField ] = useState('')
  const dispatch = useDispatch()
  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(newJobCategoriesFetchStart({ searchKeyword: nextValue }))
  }, 500), [ dispatch ])
  console.log('newJobCategories in Jobspage*****', newJobCategories)
  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchField(nextValue)
    callSearchApi(nextValue)
  }, [ callSearchApi ])
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
          onClick={ () => history.push(ROUTE_PATHS.NEW_JOB) }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          New Job
        </Button>
      </div>
      <Box className='custom-box'>
        {/* {
        jobsCards.map((jobCategory) => (
          <JobCategoryCard
            key={ jobCategory.categoryId }
            categoryName={ jobCategory.categoryName }
            jobs={ jobCategory.jobs }
          />
        ))
      } */}
        {
        newJobCategories.map((jobCategory) => (
          jobCategory.jobs.length > 0
            && (
            <JobCategoryCard
              key={ jobCategory.categoryId }
              categoryTitle={ jobCategory.categoryTitle }
              jobs={ jobCategory.jobs }
              required={ 5 }
              hired={ 2 }
              evaluating={ 2 }
              pending={ 0 }
            />
            )
        ))
      }
      </Box>
    </>
  )
}

export default JobsPage
