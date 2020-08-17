import React, { useState } from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const NewComment = ({ open, handleClose, handleSubmit }) => {
  const [ comment, setComment ] = useState('')
  const onSubmit = () => {
    handleSubmit(comment)
    setComment('')
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle className='text-align-center'>New Post</DialogTitle>
      <DialogContent className='overflow-x-hidden'>
        <CKEditor
          onChange={ (event, editor) => setComment(editor.getData()) }
          editor={ ClassicEditor }
          data={ comment }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose } color='primary'>
          Cancel
        </Button>
        <Button onClick={ onSubmit } color='primary'>
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
