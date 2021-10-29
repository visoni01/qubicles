import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { jobApplicationRequestStart } from '../../../../../redux-saga/redux/actions'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const ApplyJobModal = ({
  open, handleClose, clientId, jobId, agentUserId,
}) => {
  const [ coverLetterMessage, setCoverLetterMessage ] = useState('')

  const dispatch = useDispatch()
  const { success } = useSelector((state) => state.jobApplication)

  const closeAndResetInputFields = useCallback(() => {
    handleClose()
    setCoverLetterMessage('')
    // eslint-disable-next-line
  }, [ ])

  useEffect(() => {
    if (success) {
      closeAndResetInputFields()
    }
    // eslint-disable-next-line
  }, [ success ])

  const handleApplyJob = useCallback(
    () => {
      dispatch(jobApplicationRequestStart({
        applicationData: {
          agentUserId,
          clientId,
          jobId,
          coverLetter: coverLetterMessage,
          // WIP VIDEO PITCH
          videoPitchUrl: '',
          status: 'applied',
        },
        requestType: REQUEST_TYPES.CREATE,
      }))
    },
    [ dispatch, coverLetterMessage, jobId, clientId, agentUserId ],
  )

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='md'
      className='custom-modal'

    >
      <div className='header'>
        <DialogTitle>
          <div className='h2'>Application</div>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ closeAndResetInputFields }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <div className='mb-10 is-fullwidth display-inline-flex justify-between align-items-center'>
          <h3 className='h3'>Cover Letter</h3>
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Add Media

          </Button>
        </div>
        <CKEditor
          editor={ ClassicEditor }
          onChange={ (event, editor) => setCoverLetterMessage(editor.getData()) }
          name='cover-letter'
          data={ coverLetterMessage }
          onInit={ (editor) => {
            editor.setData(coverLetterMessage)
            editor.editing.view.change((writer) => {
              writer.setStyle(
                'height',
                '300px',
                editor.editing.view.document.getRoot(),
              )
            })
          } }
        />
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          color='secondary'
          className='cancel-button'
          onClick={ closeAndResetInputFields }
        >
          Cancel
        </Button>
        <Button
          className='button-primary-small'
          classes={ { label: 'primary-label' } }
          onClick={ handleApplyJob }
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ApplyJobModal.defaultProps = {
  clientId: null,
  jobId: null,
  agentUserId: null,
}

ApplyJobModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  clientId: PropTypes.number,
  jobId: PropTypes.number,
  agentUserId: PropTypes.number,
}

export default ApplyJobModal
