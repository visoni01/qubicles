import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Divider, List, ListItem, ListItemText, MenuItem,
} from '@material-ui/core'
import _ from 'lodash'
import './style.scss'
import ROUTE_PATHS from '../../../../routes/routesPath'
import JobFilterSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/jobsFilterSkeleton'
import { jobCategoriesOnlyFetchStart, updateViewAllCoursesFilter } from '../../../../redux-saga/redux/people'

const TrainingFilter = () => {
  const { jobCategoriesOnly, isLoading, searchKeyword } = useSelector((state) => state.jobCategoriesOnly)
  const { categoryId, searchField } = useSelector((state) => state.viewAllCourses)
  const [ selectedCategory, setSelectedCategory ] = useState(categoryId)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEmpty(jobCategoriesOnly) || !_.isEmpty(searchKeyword)) {
      dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: '' }))
    }
  }, [ dispatch, jobCategoriesOnly, searchKeyword ])

  useEffect(() => {
    dispatch(updateViewAllCoursesFilter({
      categoryId: selectedCategory,
      searchField,
    }))
  }, [ dispatch, selectedCategory, searchField ])

  // Set selectedCategory to set list item to particular category
  const handleCoursesByCategory = ({ courseCategory }) => {
    setSelectedCategory(courseCategory.categoryId)
  }

  // Reset selectedCategory to set list item to 'ALL'
  const handleResetCategory = useCallback(() => {
    setSelectedCategory(0)
  }, [ ])

  return (
    <Box className='custom-box no-padding side-filter-root'>
      <h2 className='h2 title'>Training</h2>
      <List className='courses-list-items'>
        <ListItem
          button
          onClick={ () => history.push(ROUTE_PATHS.MY_COURSES) }
        >
          <ListItemText
            primary='My Courses (2)'
            className='h4 bold-filter-item'
          />
        </ListItem>
        <ListItem
          button
        >
          <ListItemText primary='Enrolled Courses (3)' className='h4 bold-filter-item' />
        </ListItem>
      </List>

      <Divider className='mb-20' />
      <h3 className='h3 subtitle'>Categories</h3>
      {isLoading ? (<JobFilterSkeleton />)
        : (
          <List className='filter-list-items'>
            <MenuItem
              button
              onClick={ handleResetCategory }
              selected={ selectedCategory === 0 }
            >
              <ListItemText classes={ { primary: 'list-item' } }>
                <h4 className='h4 light unbold'>All</h4>
              </ListItemText>
            </MenuItem>

            {
          jobCategoriesOnly.map((courseCategory) => (
            <MenuItem
              button
              onClick={ () => handleCoursesByCategory({ courseCategory }) }
              selected={ selectedCategory === courseCategory.categoryId }
              key={ courseCategory.categoryId }
            >
              <ListItemText classes={ { primary: 'list-item' } }>
                <h4 className='h4 light unbold'>
                  {courseCategory.categoryTitle}
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

export default TrainingFilter
