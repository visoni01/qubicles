import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, IconButton, TextField, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../styles.scss'
import { useDispatch } from 'react-redux'
import { agentResumeSkillsStart } from '../../../../../redux-saga/redux/people'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const AddEndorseModal = ({
  open, handleClose, skillId, skillName, candidateId,
}) => {
  const [ comment, setComment ] = useState('')
  const dispatch = useDispatch()

  const handleComment = useCallback((e) => {
    setComment(e.target.value)
  }, [ ])

  const handleEndorse = useCallback(() => {
    dispatch(agentResumeSkillsStart({
      requestType: REQUEST_TYPES.UPDATE,
      candidateId,
      updatedDataType: 'AddEndorse',
      updatedData: {
        skillId,
        comment,
      },
    }))
    handleClose()
  }, [ dispatch, skillId, comment, candidateId, handleClose ])

  const handleCancel = useCallback(() => {
    setComment('')
    handleClose()
  }, [ handleClose ])

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ handleCancel }
      maxWidth='xs'
      classes={ { paper: 'endorsement-modal' } }
      className='custom-modal auto-height'
    >
      <div className='header'>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleCancel }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <h3 className='h3 mb-20 mt-10 mr-20'>{ `You are endorsing for skill ${ skillName }!` }</h3>
        <div className='mb-20'>
          <TextField
            className='is-fullwidth'
            autoComplete='off'
            variant='outlined'
            margin='dense'
            multiline
            rows={ 7 }
            defaultValue={ comment }
            onChange={ handleComment }
            placeholder='Add a short note to give your endorsement more significance (optional)'
          />
        </div>
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          classes={ {
            root: 'button-primary-small is-fullwidth',
            label: 'button-primary-small-label',
          } }
          onClick={ handleEndorse }
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddEndorseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  skillId: PropTypes.number.isRequired,
  skillName: PropTypes.string.isRequired,
  candidateId: PropTypes.number.isRequired,
}

export default AddEndorseModal
