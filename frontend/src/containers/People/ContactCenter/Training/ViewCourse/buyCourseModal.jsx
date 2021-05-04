import React from 'react'
import {
  Dialog, DialogTitle, DialogActions, DialogContent, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const BuyCourseModal = ({
  open, onClose, courseInfo,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    className='custom-modal'
    classes={ { paper: 'buy-course-modal-width', paperScrollPaper: 'buy-course-modal-height' } }
    fullWidth
    maxWidth='xs'
  >
    <div className='header'>
      <DialogTitle>
        <div className='h2'>Buy Course</div>
      </DialogTitle>
      <DialogActions className='cross-button'>
        <IconButton
          className='is-size-6'
          onClick={ onClose }
        >
          <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
        </IconButton>
      </DialogActions>
    </div>
    <DialogContent>
      <div className='mb-10'>
        <span className='para light'>
          {`Completing courses in Qubicles University will help increase your
        visibility and chances for success! Please confirm your purchase of `}
        </span>
        <span className='h4'>{`${ courseInfo.courseName } `}</span>
        <span className='para'>{'by '}</span>
        <span className='h4'>
          {`${ courseInfo.courseCreatorName }, ${ courseInfo.dateReleased }`}
        </span>
      </div>
      <div className='mt-10 mb-20 display-inline-flex justify-center is-fullwidth align-items-center'>
        <h3 className='h3'>{`${ courseInfo.price } QBE`}</h3>
        <span className='para light ml-5 mr-5'> = </span>
        <h4 className='h4 light'>{`${ courseInfo.price } USD`}</h4>
      </div>
      <div className='mb-10'>
        <Button
          className='is-fullwidth'
          classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
        >
          Buy
        </Button>
      </div>
      <div className='mb-20'>
        <Button
          className='is-fullwidth'
          classes={ { root: 'button-secondary-small-red', label: 'button-secondary-small-label' } }
          onClick={ onClose }
        >
          Cancel
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)

BuyCourseModal.defaultProps = {
  courseInfo: {
    courseId: 1,
    courseName: 'Introduction to Deep Learning',
    courseCreatorName: 'Chris Porter',
    dateReleased: '2020',
    price: 12,
  },
}

BuyCourseModal.propTypes = {
  courseInfo: PropTypes.shape({
    courseId: PropTypes.number,
    courseName: PropTypes.string,
    courseCreatorName: PropTypes.string,
    dateReleased: PropTypes.string,
    price: PropTypes.number,
  }),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default BuyCourseModal
