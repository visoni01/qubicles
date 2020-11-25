import React, { useCallback, useState } from 'react'
import {
  Box, InputBase, Button, debounce,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import JobCategoryCard from './JobCategoryCard'
import ROUTE_PATHS from '../../../../routes/routesPath'
import { newJobCategoriesFetchStart } from '../../../../redux-saga/redux/actions'

const JobsPage = () => {
  const history = useHistory()
  const { newJobCategories, selectedCategoryId } = useSelector((state) => state.newJobCategories)
  const [ searchField, setSearchField ] = useState('')
  const dispatch = useDispatch()

  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(newJobCategoriesFetchStart({ searchKeyword: nextValue }))
  }, 500), [ dispatch ])

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
        <JobsData
          selectedCategoryId={ selectedCategoryId }
          newJobCategories={ newJobCategories }
        />
      </Box>
    </>
  )
}

const JobsData = ({ selectedCategoryId, newJobCategories }) => {
  if (selectedCategoryId) {
    const index = newJobCategories.findIndex((category) => category.categoryId === selectedCategoryId)
    return (
      newJobCategories.length > 0
      && (
      <JobCategoryCard
        key={ newJobCategories[ index ].categoryId }
        categoryId={ newJobCategories[ index ].categoryId }
        categoryTitle={ newJobCategories[ index ].categoryTitle }
        jobs={ newJobCategories[ index ].jobs }
        needed={ 5 }
        fulfilled={ 2 }
        evaluating={ 2 }
        pending={ 0 }
      />
      )
    )
  }
  return newJobCategories.map((jobCategory) => (
    jobCategory.jobs.length > 0
        && (
        <JobCategoryCard
          key={ jobCategory.categoryId }
          categoryId={ jobCategory.categoryId }
          categoryTitle={ jobCategory.categoryTitle }
          jobs={ jobCategory.jobs }
          needed={ 5 }
          fulfilled={ 2 }
          evaluating={ 2 }
          pending={ 0 }
        />
        )
  ))
}

export default JobsPage
