import React, { useState } from 'react'
import {
  faChevronUp, faChevronDown, faPlayCircle, faFileAlt, faFile, faFileSignature,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box, List, Button,
  ListItem, ListItemIcon,
  ListItemText, Collapse, Divider,
} from '@material-ui/core'
import CoursePreview from './CoursePreview'

const CourseContents = () => {
  const [ open, setOpen ] = useState('true')
  const handleListOpen = () => {
    setOpen(!open)
  }
  const [ openCoursePlayer, setOpenCoursePlayer ] = useState(false)

  return (
    <>
      <div className='course-contents-root'>
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
              <ListItem className='nested-list'>
                <ListItemIcon>
                  <FontAwesomeIcon icon={ faPlayCircle } />
                </ListItemIcon>
                <ListItemText className='nested-list-heading' primary='Intro' />
                <Button className='text-button' onClick={ () => setOpenCoursePlayer(open) }> Preview </Button>
              </ListItem>
              <ListItem className='nested-list'>
                <ListItemIcon>
                  <FontAwesomeIcon icon={ faFile } />
                </ListItemIcon>
                <ListItemText className='nested-list-heading' primary='About' />
                <Button className='text-button'> Start </Button>
              </ListItem>
              <ListItem className='nested-list'>
                <ListItemIcon>
                  <FontAwesomeIcon icon={ faFileAlt } />
                </ListItemIcon>
                <ListItemText className='nested-list-heading' primary='Values' />
                <Button className='text-button'> Start </Button>
              </ListItem>
              <ListItem className='nested-list'>
                <ListItemIcon>
                  <FontAwesomeIcon icon={ faFileSignature } />
                </ListItemIcon>
                <ListItemText className='nested-list-heading' primary='Test' />
                <Button className='text-button'> Start </Button>
              </ListItem>
            </List>
          </Collapse>
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
      <CoursePreview
        open={ openCoursePlayer }
        onClose={ () => setOpenCoursePlayer(false) }
        onSubmit={ () => setOpenCoursePlayer(false) }
      />
    </>
  )
}

export default CourseContents
