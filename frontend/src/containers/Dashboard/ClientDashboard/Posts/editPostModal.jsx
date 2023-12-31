import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import EditPost from './editPost'

const EditPostModal = ({
  postId, open, handleClose, postText, postImage, permission, owner, createdAt,
}) => (
  <Dialog
    open={ open }
    onClose={ handleClose }
    aria-labelledby='delete-dialog-title'
    className='custom-modal'
    classes={ { paper: 'edit-post-modal' } }
    maxWidth='md'
    fullWidth
    scroll='body'
  >
    <div className='header'>
      <DialogTitle>
        <div className='h2'> Edit Post </div>
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
    <DialogContent
      classes={ { root: 'edit-post-content' } }
    >
      <EditPost
        initialPostData={ {
          postText,
          permission,
          postImage,
        } }
        owner={ owner }
        createdAt={ createdAt }
        handleCancelEdit={ handleClose }
        postId={ postId }
      />
    </DialogContent>
  </Dialog>
)

EditPostModal.defaultProps = {
  postImage: null,
}

EditPostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired,
  postImage: PropTypes.string,
  permission: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default EditPostModal
