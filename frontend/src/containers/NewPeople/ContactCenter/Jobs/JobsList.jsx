import React, { useEffect, useState, useCallback } from 'react'
import {
  Box, IconButton, List, ListItemText, InputBase, MenuItem,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {
  newJobCategoriesFetchStart,
  getJobsByCategory,
  resetJobsByCategorySelection,
} from '../../../../redux-saga/redux/actions'

const JobsList = () => {
  const [ searchCategories, setSearchCategories ] = useState(false)
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)
  const [ selectedCategory, setSelectedCategory ] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newJobCategoriesFetchStart({ searchKeyword: '' }))
  }, [ dispatch ])

  const handleJobsByCategory = ({ jobCategory }) => {
    dispatch(getJobsByCategory({ categoryId: jobCategory.categoryId }))
    setSelectedCategory(jobCategory.categoryId)
  }

  const handleResetJobs = useCallback(() => {
    dispatch(resetJobsByCategorySelection())
    setSelectedCategory(0)
  }, [ dispatch, selectedCategory ])

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
        />
      </div>
      )}

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
          newJobCategories.map((jobCategory) => (
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
    </Box>
  )
}

export default JobsList
