import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { TextField, Checkbox } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const FormDialog = ({ open, handleClose, onSubmit }) => {
  const [ groupData, setGroupData ] = useState({
    title: '',
    isPublic: false,
  })

  const handleCheckBox = (event) => {
    setGroupData({ ...groupData, isPublic: event.target.checked })
  }

  const handleGroupTitle = (event) => {
    setGroupData({ ...groupData, title: event.target.value })
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle>New Group</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          id='name'
          fullWidth
          variant='outlined'
          label='Title'
          value={ groupData.title }
          onChange={ handleGroupTitle }
        />
      </DialogContent>
      <DialogContent>
        <Checkbox
          checked={ groupData.isPublic }
          onChange={ handleCheckBox }
        />
        <span>Make channel Public</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose } color='primary'>
          Cancel
        </Button>
        <Button onClick={ () => onSubmit(groupData) } color='primary'>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
