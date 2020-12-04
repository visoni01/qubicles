import React, { useEffect, useState, useCallback } from 'react'
import {
  Box, IconButton, List, ListItemText, InputBase, MenuItem, debounce,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {
  jobCategoriesOnlyFetchStart,
} from '../../../../redux-saga/redux/actions'
import JobsFilterSkeleton from '../SkeletonLoader/JobsFilterSkeleton'
import './styles.scss'

const JobsList = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [ searchCategories, setSearchCategories ] = useState(false)
  const { jobCategoriesOnly, isLoading } = useSelector((state) => state.jobCategoriesOnly)
  const [ searchField, setSearchField ] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEmpty(jobCategoriesOnly)) {
      dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: '' }))
    }
  }, [ dispatch ])

  // Search categories
  const callSearchCategoriesApi = useCallback(debounce((nextValue) => {
    dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: nextValue }))
  }, 500), [ dispatch ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchField(nextValue)
    callSearchCategoriesApi(nextValue)
  }, [ callSearchCategoriesApi ])

  const handleJobsByCategory = ({ jobCategory }) => {
    setSelectedCategory(jobCategory.categoryId)
  }

  const handleResetJobs = useCallback(() => {
    setSelectedCategory(0)
  }, [ dispatch ])

  return (
    <Box className='custom-box no-padding side-filter-root job-list'>
      <h2 className='h2 title'>Jobs</h2>
      <div className='job-list-title'>
        <h3 className='h3 subtitle'> Categories </h3>
        <div className='job-list-icon'>
          <IconButton onClick={ () => setSearchCategories((initialState) => !initialState) }>
            <FontAwesomeIcon icon={ faSearch } className='custom-fa-icon light' />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={ faSlidersH } className='custom-fa-icon light' />
          </IconButton>
        </div>
      </div>

      {searchCategories && (
      <div className='search-input mb-10'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
        <InputBase
          type='text'
          placeholder='Search Categories'
          className='input-field'
          name='searchCategories'
          onChange={ handleSearch }
          value={ searchField }
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

JobsList.defaultProps = {
  selectedCategory: 0,
}

JobsList.propTypes = {
  selectedCategory: PropTypes.number,
  setSelectedCategory: PropTypes.func.isRequired,
}

export default React.memo(JobsList)
