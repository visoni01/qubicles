import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line import/no-cycle
import CourseContents from './CourseContents'

const CoursePreview = ({
  open, onClose, onSubmit,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    classes={ { paper: 'course-preview-modal' } }
    className='custom-modal'
    fullWidth
    maxWidth='lg'
  >
    <div className='display-inline-flex'>
      <div className='dialog-left-side ml-20 mr-10'>
        <h3 className='h3'> Overview </h3>
        <CourseContents
          isPreview={ false }
        />
      </div>
      <div className='dialog-right-side'>
        <div className='display-inline-flex justify-between no-padding-bottom'>
          <DialogTitle className='width-full'>
            <h4 className='h4 mt-10'> How to manage clients ? </h4>
          </DialogTitle>
          <DialogActions className='cross-button'>
            <IconButton className='is-size-6' onClick={ onClose }>
              <FontAwesomeIcon className='custom-fa-icon' icon={ faTimes } />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent>
          <h3 className='h3 mb-10 light'>
            Section 1:
            <span className='h3'> Values </span>
          </h3>
          <div className='post-image'>
            <img alt='post' src='https://picsum.photos/896/504' />
          </div>
        </DialogContent>
      </div>
    </div>
  </Dialog>
)

CoursePreview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default CoursePreview
