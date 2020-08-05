import React, { useState } from 'react'
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core'
import PropTypes from 'prop-types'

const NewComment = ({ open, handleClose, handleSubmit }) => {
  const [ comment, setComment ] = useState('')
  const onSubmit = () => {
    handleSubmit(comment)
    setComment('')
  }

  return (
    <Dialog open={ open } onClose={ handleClose } aria-labelledby='form-dialog-title'>
      <DialogTitle className='text-align-center'>New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='comment'
          label='Comment'
          fullWidth
          value={ comment }
          onChange={ (e) => setComment(e.target.value) }
        />
      </DialogContent>
      <DialogActions>
        <Button className='button secondary-btn btn-dash raised ripple' onClick={ handleClose } color='primary'>
          Cancel
        </Button>
        <Button className='button secondary-btn btn-dash raised ripple' onClick={ onSubmit } color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

NewComment.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default NewComment
