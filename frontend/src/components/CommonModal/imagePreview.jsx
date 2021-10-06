import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ImagePreview = ({ open, handleClose, imageUrl }) => (
  <Dialog
    open={ open }
    onClose={ handleClose }
    className='image-preview-dialog auto-height'
    maxWidth='md'
    fullWidth
  >
    <DialogActions className='cross-button'>
      <IconButton onClick={ handleClose }>
        <FontAwesomeIcon className='custom-fa-icon pointer sz-xl' icon={ faTimesCircle } />
      </IconButton>
    </DialogActions>

    <DialogContent>
      <img alt='preview' src={ imageUrl } />
    </DialogContent>
  </Dialog>
)

ImagePreview.defaultProps = {
  open: false,
}

ImagePreview.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

export default ImagePreview
