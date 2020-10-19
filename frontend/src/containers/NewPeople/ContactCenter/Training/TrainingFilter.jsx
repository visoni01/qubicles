import React from 'react'
import {
  Box, Button, Divider, List, ListItem, ListItemText,
} from '@material-ui/core'
import { courseCategories } from '../testData'
import './style.scss'

const TrainingFilter = () => (

  <Box className='side-filter-root'>
    <h2 className='title'>Training</h2>
    <List className='courses-list-items'>
      <ListItem
        button
      >
        <ListItemText primary='My Courses (2)' classes={ { primary: 'bold-filter-item' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Enrolled Courses (3)' classes={ { primary: 'bold-filter-item' } } />
      </ListItem>
    </List>

    <Divider className='mb-20' />
    <h3 className='subtitle'>Categories</h3>
    <List className='filter-list-items'>
      <ListItem
        button
        selected
      >
        <ListItemText primary='All' classes={ { primary: 'list-item' } } />
      </ListItem>
      {
        courseCategories.map((categoryTitle) => (
          <ListItem
            key={ categoryTitle }
            button
          >
            <ListItemText primary={ categoryTitle } classes={ { primary: 'list-item' } } />
          </ListItem>
        ))
      }
    </List>
  </Box>
)

export default TrainingFilter
