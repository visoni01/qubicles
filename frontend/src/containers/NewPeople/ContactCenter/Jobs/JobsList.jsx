import React from 'react'
import {
  Box,
  IconButton, List, ListItem, ListItemText,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'

const JobsList = () => (
  <Box className='custom-box no-padding side-filter-root job-list'>
    <h2 className='h2 title'>Jobs</h2>
    <div className='job-list-title'>
      <h3 className='h3 subtitle'> Categories </h3>
      <div className='job-list-icon'>
        <IconButton>
          <FontAwesomeIcon icon={ faSearch } className='custom-fa-icon light' />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={ faSlidersH } className='custom-fa-icon light' />
        </IconButton>
      </div>
    </div>

    <List className='filter-list-items'>
      <ListItem
        button
        selected
      >
        <ListItemText classes={ { primary: 'list-item' } }>
          <h4 className='h4 light unbold'>All</h4>
        </ListItemText>
      </ListItem>
      <ListItem
        button
      >
        <ListItemText classes={ { primary: 'list-item' } }>
          <h4 className='h4 light unbold'>Account Sales</h4>
        </ListItemText>
      </ListItem>
      <ListItem
        button
      >
        <ListItemText classes={ { primary: 'list-item' } }>
          <h4 className='h4 light unbold'>Client Service</h4>
        </ListItemText>
      </ListItem>
      <ListItem
        button
      >
        <ListItemText classes={ { primary: 'list-item' } }>
          <h4 className='h4 light unbold'>Customer Service</h4>
        </ListItemText>
      </ListItem>
    </List>
  </Box>
)

export default JobsList
