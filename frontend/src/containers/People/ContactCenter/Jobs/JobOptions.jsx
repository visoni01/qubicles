import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { deleteJob } from '../../../../redux-saga/redux/actions'
import ConfirmationModal from '../../../../components/CommonModal/ConfirmationModal'
import { JOB_ROUTE } from '../../../../routes/routesPath'

const JobOptions = ({ categoryId, jobId }) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmDeleteModal, setOpenConfirmDelete ] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleClose = () => {
    setOpenOptions(false)
    setAnchorEl(null)
  }

  const handleJoboOptionsClick = useCallback((e) => {
    setOpenOptions((current) => !current)
    setAnchorEl(e.currentTarget)
  }, [])

  const handleCancelActivity = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
    setOpenConfirmDelete(false)
  }, [])

  const handleDeleteJob = useCallback(() => {
    dispatch(deleteJob({
      categoryId,
      jobId,
    }))
  }, [ categoryId, jobId, dispatch ])

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
            startIcon={ <FontAwesomeIcon icon={ faPen } className='custom-fa-icon dark mr-5' /> }
            onClick={ () => history.push(`${ JOB_ROUTE }/${ jobId }/edit`) }
          >
            <p className='para'> Edit </p>
          </Button>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            startIcon={ <FontAwesomeIcon icon={ faTrash } className='custom-fa-icon dark mr-5' /> }
            onClick={ () => setOpenConfirmDelete(true) }
          >
            <p className='para red'> Delete </p>
          </Button>
        </div>
      </Popover>
      <ConfirmationModal
        open={ openConfirmDeleteModal }
        handleClose={ handleCancelActivity }
        message='Are you sure you want to delete this job ?'
        confirmButtonText='Delete'
        handleConfirm={ handleDeleteJob }
      />
    </>
  )
}

JobOptions.propTypes = {
  categoryId: PropTypes.number.isRequired,
  jobId: PropTypes.number.isRequired,
}

export default JobOptions
