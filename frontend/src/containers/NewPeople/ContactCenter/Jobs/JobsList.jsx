import React from 'react'
import {
  Box,
  IconButton, List, ListItem, ListItemText,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import '../newStyles.scss'

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
        <ListItemText primary='All' classes={ { primary: 'list-item h4 light' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Account Sales' classes={ { primary: 'list-item h4 light' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Client Service' classes={ { primary: 'list-item h4 light' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Customer Service' classes={ { primary: 'list-item h4 light' } } />
      </ListItem>
    </List>
  </Box>
)

export default JobsList
