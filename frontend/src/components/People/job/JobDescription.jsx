import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSuitcase, faEllipsisV, faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuItem } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { jobSubDetailsValidator } from '../peopleValidator'
import { deleteJob } from '../../../redux-saga/redux/actions'
import { isUserOwner } from '../../../utils/common'

const JobDescription = ({
  categoryId, notifications, title, description, noOfApplications, jobId, ownerId,
}) => {
  const dispatch = useDispatch()

  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = useCallback(() => {
    setAnchorEl(null)
    dispatch(deleteJob({ categoryId, jobId }))
  }, [ jobId ])

  return (
    <div className='forum-channel'>
      <div className='channel-icon'>
        <FontAwesomeIcon icon={ faSuitcase } />
        {/* New Topics */}
        <div className='new-indicator'>
          <span>{notifications}</span>
        </div>
      </div>
      <div className='channel-meta'>
        <span>{title}</span>
        <span>{description}</span>
      </div>
      <div className='channel-topics'>
        <span>Applications</span>
        <span>{noOfApplications }</span>
      </div>

      {/* Jobs dropdown */}
      <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
        {isUserOwner(ownerId) && (
        <div className='button'>
          <i className='dropdown-icon'>
            <FontAwesomeIcon
              icon={ faEllipsisV }
              aria-controls='menu'
              aria-haspopup='true'
              onClick={ handleClick }
            />
          </i>
        </div>
        )}
        <div className='job-dropdown'>
          <Menu
            classes={ {
              paper: 'job-dropdown-menu',
            } }
            id='menu'
            anchorEl={ anchorEl }
            keepMounted
            open={ Boolean(anchorEl) }
            onClose={ handleClose }
          >
            <MenuItem
              onClick={ handleDelete }
            >
              <FontAwesomeIcon icon={ faTrash } />
              <span className='remove'>
                Remove
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>

    </div>
  )
}

JobDescription.defaultProps = {
  notifications: 3,
  noOfApplications: 0,
}

JobDescription.propTypes = jobSubDetailsValidator

export default JobDescription
