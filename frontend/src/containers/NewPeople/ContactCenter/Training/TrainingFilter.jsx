import React from 'react'
import {
  Box, Divider, List, ListItem, ListItemText,
} from '@material-ui/core'
import { courseCategories } from '../testData'
import './style.scss'

const TrainingFilter = () => (

  <Box className='custom-box no-padding side-filter-root'>
    <h2 className='h2 title'>Training</h2>
    <List className='courses-list-items'>
      <ListItem
        button
      >
        <ListItemText primary='My Courses (2)' className='h4 bold-filter-item' />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Enrolled Courses (3)' className='h4 bold-filter-item' />
      </ListItem>
    </List>

    <Divider className='mb-20' />
    <h3 className='h3 subtitle'>Categories</h3>
    <List className='filter-list-items'>
      <ListItem
        button
        selected
      >
        <ListItemText classes={ { primary: 'list-item' } }>
          <h4 className='h4 light unbold'>All</h4>
        </ListItemText>
      </ListItem>
      {
        courseCategories.map((categoryTitle) => (
          <ListItem
            key={ categoryTitle }
            button
          >
            <ListItemText classes={ { primary: 'list-item' } }>
              <h4 className='h4 light unbold'>{categoryTitle}</h4>
            </ListItemText>
          </ListItem>
        ))
      }
    </List>
  </Box>
)

export default TrainingFilter
