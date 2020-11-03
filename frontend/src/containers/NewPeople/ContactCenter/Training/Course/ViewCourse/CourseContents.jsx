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
          className='overview-list border-1'
        >
          <ListItem button onClick={ handleListOpen }>
            <ListItemIcon>
              {open
                ? <FontAwesomeIcon className='custom-fa-icon' icon={ faChevronUp } />
                : <FontAwesomeIcon className='custom-fa-icon' icon={ faChevronDown } />}
            </ListItemIcon>
            <ListItemText>
              <h4 className='h4'>Section 1</h4>
            </ListItemText>
            <p className='para'> 3 units </p>
          </ListItem>
          <Divider />
          <Collapse in={ open } timeout='auto' unmountOnExit>
            <List component='div'>
              <ListItem className='nested-list' disableGutters>
                <ListItemIcon>
                  <FontAwesomeIcon className='custom-fa-icon light' icon={ faPlayCircle } />
                </ListItemIcon>
                <ListItemText>
                  <p className='text-link'> Intro </p>
                </ListItemText>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => setOpenCoursePlayer(open) }
                >
                  Preview
                </Button>
              </ListItem>

              {/* List Item */}
              <ListItem className='nested-list' disableGutters>
                <ListItemIcon>
                  <FontAwesomeIcon className='custom-fa-icon light' icon={ faFileAlt } />
                </ListItemIcon>
                <ListItemText>
                  <p className='para light'> About </p>
                </ListItemText>
                <Button
                  disabled
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                >
                  Start
                </Button>
              </ListItem>

              {/* List Item */}
              <ListItem className='nested-list' disableGutters>
                <ListItemIcon>
                  <FontAwesomeIcon className='custom-fa-icon light' icon={ faFileAlt } />
                </ListItemIcon>
                <ListItemText>
                  <p className='para light'> Values </p>
                </ListItemText>
                <Button
                  disabled
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                >
                  Start
                </Button>
              </ListItem>

              {/* List Item */}
              <ListItem className='nested-list' disableGutters>
                <ListItemIcon>
                  <FontAwesomeIcon className='custom-fa-icon light' icon={ faFileSignature } />
                </ListItemIcon>
                <ListItemText>
                  <p className='para light'> Test </p>
                </ListItemText>
                <Button
                  disabled
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                >
                  Start
                </Button>
              </ListItem>
            </List>
          </Collapse>
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
