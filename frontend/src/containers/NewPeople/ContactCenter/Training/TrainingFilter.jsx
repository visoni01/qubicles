import React from 'react'
import {
  Box, Button, Divider, List, ListItem, ListItemText,
} from '@material-ui/core'
import { courseCategories } from './testData'
import './style.scss'

const TrainingFilter = () => (

  <Box className='training-filter'>
    <h2 className='title'>Training</h2>
    <List className='courses-list-items'>
      <ListItem
        button
      >
        <ListItemText primary='My Courses (2)' classes={ { primary: 'course-filter' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Enrolled Courses (3)' classes={ { primary: 'course-filter' } } />
      </ListItem>
    </List>

    <Divider className='mb-20' />
    <h3 className='categories'>Categories</h3>
    <List className='categories-list-items'>
      <ListItem
        button
        selected
      >
        <ListItemText primary='All' classes={ { primary: 'category-name' } } />
      </ListItem>
      {
        courseCategories.map((categoryTitle) => (
          <ListItem
            key={ categoryTitle }
            button
          >
            <ListItemText primary={ categoryTitle } classes={ { primary: 'category-name' } } />
          </ListItem>
        ))
      }
    </List>
  </Box>
)

export default TrainingFilter
