import React from 'react'
import {
  Box,
  IconButton, List, ListItem, ListItemText,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'

const JobsList = () => (
  <Box className='job-list-root'>
    <h2 className='ml-20'>Jobs</h2>
    <div className='job-list-title'>
      <h3> Categories </h3>
      <div className='job-list-icon'>
        <IconButton>
          <FontAwesomeIcon icon={ faSearch } />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={ faSlidersH } />
        </IconButton>
      </div>
    </div>

    <List className='list-items'>
      <ListItem
        button
        selected
      >
        <ListItemText primary='All' classes={ { primary: 'job-name' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Accounting' classes={ { primary: 'job-name' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Client Service' classes={ { primary: 'job-name' } } />
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Customer Service' classes={ { primary: 'job-name' } } />
      </ListItem>
    </List>
  </Box>
)

export default JobsList
