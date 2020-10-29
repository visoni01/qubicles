import React, { useState } from 'react'
import {
  faCircle, faChevronUp, faChevronDown, faPlayCircle, faFileAlt, faFile, faFileSignature,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box, List,
  ListItem, ListItemIcon,
  ListItemText, Collapse, Divider,
} from '@material-ui/core'
import DisplayError from '../../../DisplayError'

const CourseOverview = () => {
  const [ open, setOpen ] = useState('true')
  const handleListOpen = () => {
    setOpen(!open)
  }
  return (
    <>
      <Box className='box course-overview-root'>
        <div className='heading-section'>
          <h3 className='h3'>Overview</h3>
          <p className='contents para mt-10'>
            4 sections
            <FontAwesomeIcon icon={ faCircle } />
            19 units
          </p>
        </div>
        <div>
          <List
            component='nav'
            aria-labelledby='overview-list'
            className='overview-list'
          >
            <ListItem button onClick={ handleListOpen }>
              <ListItemIcon>
                {open
                  ? <FontAwesomeIcon className='top-down-icon' icon={ faChevronUp } />
                  : <FontAwesomeIcon className='top-down-icon' icon={ faChevronDown } />}
              </ListItemIcon>
              <ListItemText className='section-heading' primary='Section 1' />
              <p className='para'> 3 units </p>
            </ListItem>
            <Divider />
            <Collapse in={ open } timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem button className='nested-list'>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={ faPlayCircle } />
                  </ListItemIcon>
                  <ListItemText className='text-link' primary='Intro' />
                  <p className='text-link'> Preview </p>
                </ListItem>
                <ListItem button className='nested-list'>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={ faFile } />
                  </ListItemIcon>
                  <ListItemText className='nested-list-heading' primary='About' />
                  <p className='para'> Start </p>
                </ListItem>
                <ListItem button className='nested-list'>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={ faFileAlt } />
                  </ListItemIcon>
                  <ListItemText className='nested-list-heading' primary='Values' />
                  <p className='para'> Start </p>
                </ListItem>
                <ListItem button className='nested-list'>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={ faFileSignature } />
                  </ListItemIcon>
                  <ListItemText className='nested-list-heading' primary='Test' />
                  <p className='para'> Start </p>
                </ListItem>
              </List>
            </Collapse>
            <DisplayError />
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon className='top-down-icon' icon={ faChevronDown } />
              </ListItemIcon>
              <ListItemText className='section-heading' primary='Section 2' />
              <p className='para'> 7 units </p>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon className='top-down-icon' icon={ faChevronDown } />
              </ListItemIcon>
              <ListItemText className='section-heading' primary='Section 3' />
              <p className='para'> 4 units </p>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon className='top-down-icon' icon={ faChevronDown } />
              </ListItemIcon>
              <ListItemText className='section-heading' primary='Section 4' />
              <p className='para'> 5 units </p>
            </ListItem>
          </List>
        </div>
      </Box>
    </>
  )
}

export default CourseOverview
