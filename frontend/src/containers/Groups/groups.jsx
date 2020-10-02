import React from 'react'
import {
  Box,
  IconButton, List, ListItem, ListItemText,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Groups = () => (
  <Box className='group-list-root'>
    <div className='group-list-title'>
      <h3>Groups</h3>
      <IconButton>
        <FontAwesomeIcon icon={ faPlus } className='add-icon' />
      </IconButton>
    </div>
    <List>
      <ListItem
        button
        selected
      >
        <ListItemText primary='General' classes={ { primary: 'group-name' } } />
        <div className='notification-number'>+2</div>
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Customer Expectation' classes={ { primary: 'group-name' } } />
        <div className='notification-number'>+5</div>
      </ListItem>
      <ListItem
        button
      >
        <ListItemText primary='Hiring right people' classes={ { primary: 'group-name' } } />
        <div className='notification-number'>+5</div>
      </ListItem>
    </List>
  </Box>
)

export default Groups
