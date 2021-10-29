import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import {
  jobsWithCategoriesFetchStart, jobApplicationRequestStart,
} from '../../../../redux-saga/redux/actions'
import SingleSelect from '../../../Shared/singleSelect'
import { REQUEST_TYPES } from '../../../../utils/constants'

const InviteAgent = ({
  open, handleClose, candidateId,
}) => {
  const [ inviteMessage, setInviteMessage ] = useState('')
  const [ selectedJob, setSelectedJob ] = useState(null)

  const dispatch = useDispatch()
  const { jobsWithCategories } = useSelector((state) => state.jobsWithCategories)
  const { success } = useSelector((state) => state.jobApplication)
  const { settings } = useSelector((state) => state.clientDetails)

  const allJobs = useMemo(() => jobsWithCategories.map((category) => category.jobs.map((job) => ({
    id: job.job_id,
    title: `${ job.title } (${ category.categoryTitle })`,
  }))), [ jobsWithCategories ])

  useEffect(() => {
    dispatch(jobsWithCategoriesFetchStart({
      status: 'recruiting',
    }))
  }, [ dispatch ])

  const closeAndResetInputFields = useCallback(() => {
    handleClose()
    setInviteMessage('')
    setSelectedJob(null)
  }, [ handleClose ])

  useEffect(() => {
    if (success) {
      closeAndResetInputFields()
    }
    // eslint-disable-next-line
  }, [ success ])

  const sendInviteAgentData = useCallback(
    () => {
      dispatch(jobApplicationRequestStart({
        applicationData: {
          agentUserId: candidateId,
          clientId: settings.companyId,
          jobId: selectedJob.id,
          coverLetter: inviteMessage,
          videoPitchUrl: '',
          status: 'invited',
        },
        requestType: REQUEST_TYPES.CREATE,
      }))
    },
    [ dispatch, inviteMessage, selectedJob, candidateId, settings.companyId ],
  )

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal'

    >
      <div className='header'>
        <DialogTitle>
          <p className='h2'>Invitation</p>
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
        <h4 className='h4'>Invite for following position</h4>
        <div>
          <SingleSelect
            items={ allJobs.flat() }
            onChange={ (selectedValue) => setSelectedJob(selectedValue) }
            value={ (selectedJob && selectedJob.id) ? {
              id: selectedJob.id,
              title: selectedJob.title,
            } : null }
            label='Select Job'
          />
        </div>
        <h4 className='h4 mt-20'>Message</h4>
        <TextField
          margin='dense'
          id='name'
          fullWidth
          rows={ 15 }
          multiline
          variant='outlined'
          placeholder="Personalize your invitation by referring to agent's specific skill"
          value={ inviteMessage }
          onChange={ (event) => setInviteMessage(event.target.value) }
          required
          name='inviteMessage'
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
          onClick={ sendInviteAgentData }
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

InviteAgent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  candidateId: PropTypes.number.isRequired,
}

export default InviteAgent
