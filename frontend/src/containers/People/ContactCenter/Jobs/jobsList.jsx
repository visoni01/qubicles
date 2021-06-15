import React, { useEffect, useState, useCallback } from 'react'
import {
  Box, IconButton, List, ListItemText, InputBase, MenuItem, debounce,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import {
  jobCategoriesOnlyFetchStart, updateJobsFilter,
} from '../../../../redux-saga/redux/actions'
import JobsFilterSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/Jobs/jobsFilterSkeleton'
import './styles.scss'
import JobsFilterModal from './jobsFilter'
import { FilterIcon } from '../../../../assets/images/training'
import { SearchIcon } from '../../../../assets/images/common'

const JobsList = () => {
  const [ displaySearchCategories, setDisplaySearchCategories ] = useState(true)
  const { jobCategoriesOnly, isLoading, searchKeyword } = useSelector((state) => state.jobCategoriesOnly)
  const [ searchCategory, setSearchCategory ] = useState(searchKeyword)

  const { searchField, selectedCategoryId, status } = useSelector((state) => state.jobsWithCategories)
  const [ selectedCategory, setSelectedCategory ] = useState(selectedCategoryId)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEmpty(jobCategoriesOnly)) {
      dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: searchCategory }))
    }
    // eslint-disable-next-line
  }, [ dispatch, searchCategory ])

  useEffect(() => {
    dispatch(updateJobsFilter({
      categoryId: selectedCategory,
      searchKeyword: searchField,
      status,
    }))
  }, [ dispatch, selectedCategory, searchField, status ])

  // Fetch searched category
  const callSearchCategoriesApi = useCallback(debounce((nextValue) => {
    dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: nextValue }))
  }, 500), [ dispatch ])

  // Search category
  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchCategory(nextValue)
    callSearchCategoriesApi(nextValue)
  }, [ callSearchCategoriesApi ])

  // Set selectedCategory to set list item to particular category
  const handleJobsByCategory = ({ jobCategory }) => {
    setSelectedCategory(jobCategory.categoryId)
  }

  // Reset selectedCategory to set list item to 'ALL'
  const handleResetJobs = useCallback(() => {
    setSelectedCategory(0)
  }, [ ])

  // Job filter popover
  const [ anchorEl, setAnchorEl ] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className='custom-box no-padding side-filter-root job-list'>
      <h2 className='h2 title'>Jobs</h2>
      <div className='job-list-title'>
        <h3 className='h3 subtitle'> Categories </h3>
        <div className='job-list-icon'>
          <IconButton onClick={ () => setDisplaySearchCategories((initialState) => !initialState) }>
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={ handleClick }
            aria-describedby={ id }
          >
            <FilterIcon />
          </IconButton>
          <JobsFilterModal
            id={ id }
            anchorEl={ anchorEl }
            setAnchorEl={ setAnchorEl }
            open={ open }
            handleClose={ handleClose }
          />
        </div>
      </div>

      {displaySearchCategories && (
      <div className='is-flex search-input mb-10'>
        <SearchIcon className='ml-10 mr-10 align-self-center' />
        <InputBase
          type='text'
          placeholder='Search Categories'
          autoComplete='off'
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
