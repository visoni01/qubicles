import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { jobPostCard } from '../../../People/ContactCenter/testData'
import JobPostDetails from '../../../../components/People/ContactCenter/Jobs/JobPostDetails'
import { jobDetailsFetchStart } from '../../../../redux-saga/redux/actions'
import '../styles.scss'

const JobPostModal = ({
  open, handleClose, jobId,
}) => {
  const { jobDetails, isLoading } = useSelector((state) => state.jobDetails)
  const dispatch = useDispatch()
  useEffect(() => {
    if (jobId) {
      dispatch(jobDetailsFetchStart({ jobId }))
    }
  }, [ dispatch, jobId ])
  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal job-post-root'
    >
      <div className='header'>
        <DialogTitle>
          <h2 className='h2'>Job Post</h2>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <JobPostDetails
          courses={ jobPostCard.courses }
          jobDetails={ jobDetails }
          isLoading={ isLoading }
        />
      </DialogContent>
    </Dialog>
  )
}

JobPostModal.defaultProps = {
  jobId: null,
}

JobPostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  jobId: PropTypes.number,
}

export default JobPostModal
