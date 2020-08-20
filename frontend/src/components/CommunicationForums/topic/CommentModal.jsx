import React, { useState, useEffect } from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const NewComment = ({
  open, handleClose, handleSubmit, commentData, isEdit,
}) => {
  const [ comment, setComment ] = useState(commentData)

  useEffect(() => { setComment(commentData) }, [ commentData ])

  const onSubmit = () => {
    handleSubmit(comment)
    setComment(commentData)
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle className='text-align-center'>
        {isEdit ? 'Update Post' : 'New Post' }
      </DialogTitle>
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
          { isEdit ? 'Update' : 'Submit' }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

NewComment.defaultProps = {
  commentData: '',
}

NewComment.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  commentData: PropTypes.string,
}

export default NewComment
