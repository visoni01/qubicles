import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteJob } from '../../../../redux-saga/redux/actions'

const JobOptions = ({ categoryId, jobId }) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenOptions(false)
    setAnchorEl(null)
  }

  const handleJoboOptionsClick = useCallback((e) => {
    setOpenOptions((current) => !current)
    setAnchorEl(e.currentTarget)
  }, [])

  const handleDeleteJob = useCallback(() => {
    dispatch(deleteJob({
      categoryId,
      jobId,
    }))
  }, [])

  return (
    <>
      <IconButton
        onClick={ handleJoboOptionsClick }
        className='job-options-ellipsis-button pull-right'
      >
        <FontAwesomeIcon icon={ faEllipsisV } className='custom-fa-icon sz-md dark' />
      </IconButton>
      <Popover
        open={ openOptions }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        elevation={ 0 }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'right',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
      >
        <div className='ellipsis-options-menu border-2'>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            startIcon={ <FontAwesomeIcon icon={ faTrash } className='custom-fa-icon dark mr-5' /> }
            onClick={ handleDeleteJob }
          >
            <p className='para red'> Delete </p>
          </Button>
        </div>
      </Popover>
    </>
  )
}

JobOptions.propTypes = {
  categoryId: PropTypes.number.isRequired,
  jobId: PropTypes.number.isRequired,
}

export default JobOptions
