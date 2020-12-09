import React, { useEffect, useState, useCallback } from 'react'
import {
  Box, IconButton, List, ListItemText, InputBase, MenuItem, debounce,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import {
  jobCategoriesOnlyFetchStart, updateJobsFilter, newJobCategoriesFetchStart,
} from '../../../../redux-saga/redux/actions'
import JobsFilterSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/JobsFilterSkeleton'
import './styles.scss'

const JobsList = () => {
  const [ displaySearchCategories, setDisplaySearchCategories ] = useState(false)
  const { jobCategoriesOnly, isLoading } = useSelector((state) => state.jobCategoriesOnly)
  const [ searchCategory, setSearchCategory ] = useState('')

  const { searchField, selectedCategoryId } = useSelector((state) => state.newJobCategories)
  const [ selectedCategory, setSelectedCategory ] = useState(selectedCategoryId)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEmpty(jobCategoriesOnly)) {
      dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: searchCategory }))
    }
  }, [ dispatch, searchCategory ])

  useEffect(() => {
    dispatch(newJobCategoriesFetchStart({ categoryId: selectedCategory, searchKeyword: searchField }))
  }, [ dispatch, selectedCategory ])

  useEffect(() => {
    dispatch(updateJobsFilter({
      categoryId: selectedCategory,
      searchKeyword: searchField,
    }))
  }, [ dispatch, selectedCategory, searchField ])

  // Search categories
  const callSearchCategoriesApi = useCallback(debounce((nextValue) => {
    dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: nextValue }))
  }, 500), [ dispatch ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchCategory(nextValue)
    callSearchCategoriesApi(nextValue)
  }, [ callSearchCategoriesApi ])

  const handleJobsByCategory = ({ jobCategory }) => {
    setSelectedCategory(jobCategory.categoryId)
  }

  const handleResetJobs = useCallback(() => {
    setSelectedCategory(0)
  }, [ ])

  return (
    <Box className='custom-box no-padding side-filter-root job-list'>
      <h2 className='h2 title'>Jobs</h2>
      <div className='job-list-title'>
        <h3 className='h3 subtitle'> Categories </h3>
        <div className='job-list-icon'>
          <IconButton onClick={ () => setDisplaySearchCategories((initialState) => !initialState) }>
            <FontAwesomeIcon icon={ faSearch } className='custom-fa-icon light' />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={ faSlidersH } className='custom-fa-icon light' />
          </IconButton>
        </div>
      </div>

      {displaySearchCategories && (
      <div className='search-input mb-10'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
        <InputBase
          type='text'
          placeholder='Search Categories'
          className='input-field'
          name='searchCategories'
          onChange={ handleSearch }
          value={ searchCategory }
        />
      </div>
      )}
      {isLoading ? (<JobsFilterSkeleton />)
        : (
          <List className='filter-list-items'>
            <MenuItem
              button
              onClick={ handleResetJobs }
              selected={ selectedCategory === 0 }
            >
              <ListItemText classes={ { primary: 'list-item' } }>
                <h4 className='h4 light unbold'>All</h4>
              </ListItemText>
            </MenuItem>

            {
          jobCategoriesOnly.map((jobCategory) => (
            <MenuItem
              button
              onClick={ () => handleJobsByCategory({ jobCategory }) }
              selected={ selectedCategory === jobCategory.categoryId }
              key={ jobCategory.categoryId }
            >
              <ListItemText classes={ { primary: 'list-item' } }>
                <h4 className='h4 light unbold'>
                  {jobCategory.categoryTitle}
                </h4>
              </ListItemText>
            </MenuItem>
          ))
        }
          </List>
        )}
    </Box>
  )
}

export default React.memo(JobsList)
