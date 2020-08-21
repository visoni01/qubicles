import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import NewJobsModal from '../../../containers/People/Jobs/newJob'

const JobsCategoryActions = ({ categoryId }) => {
  const dispatch = useDispatch()
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openJobModal, setOpenJobModal ] = useState(false)

  const toggleJobModal = useCallback(() => {
    // eslint-disable-next-line
    setOpenJobModal((openJobModal) => !openJobModal)
  }, [ setOpenJobModal ])

  const openCategoryActions = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeCategoryActions = (e) => {
    setAnchorEl(null)
  }

  const closeGroupModal = useCallback(() => {
    toggleJobModal()
    closeCategoryActions()
  }, [ setOpenJobModal ])

  return (
    <>
      <IconButton onClick={ openCategoryActions } className='job-category-action-button'>
        <FontAwesomeIcon icon={ faEllipsisV } className='is-size-6' />
      </IconButton>
      <div className='category-dropdown'>
        <Menu
          classes={ {
            paper: 'category-dropdown-menu',
          } }
          id='menu'
          anchorEl={ anchorEl }
          keepMounted
          open={ Boolean(anchorEl) }
          onClose={ closeCategoryActions }
        >
          {/* Edit Button */}
          <MenuItem onClick={ toggleJobModal }>
            <FontAwesomeIcon icon={ faPlus } />
            <span className='menu-item'>
              New Job
            </span>
          </MenuItem>
        </Menu>
        <NewJobsModal open={ openJobModal } handleClose={ closeGroupModal } categoryId={ categoryId } />
      </div>
    </>
  )
}

JobsCategoryActions.propTypes = {
  categoryId: PropTypes.number.isRequired,
}

export default JobsCategoryActions
