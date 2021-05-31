import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Radio,
  Popover,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'
import '../styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import { courseReviewsFilterStatus } from '../../../constants'
import { updateCourseReviewsFilterOrPage } from '../../../../../../redux-saga/redux/people'

const CourseReviewsFilterModal = ({
  open, handleClose, anchorEl, setAnchorEl, id,
}) => {
  const { reviewFilter } = useSelector((state) => state.courseReviews)
  const dispatch = useDispatch()

  const setStatus = useCallback((event) => {
    const checkedStatus = event.target.value
    dispatch(updateCourseReviewsFilterOrPage({
      reviewFilter: checkedStatus,
      currentPage: 1,
      offset: 0,
    }))
    setTimeout(() => {
      setAnchorEl(null)
    }, 400)
  }, [ dispatch, setAnchorEl ])

  return (
    <Popover
      id={ id }
      open={ open }
      anchorEl={ anchorEl }
      onClose={ handleClose }
      elevation={ 0 }
      anchorOrigin={ {
        vertical: 'bottom',
        horizontal: 'right',
      } }
      transformOrigin={ {
        vertical: 'top',
        horizontal: 'right',
      } }
    >
      <RadioGroup
        className='radio-buttons border-2 jobs-filter'
        value={ reviewFilter }
        onChange={ setStatus }
      >
        {Object.keys(courseReviewsFilterStatus).map((item) => (
          <FormControlLabel
            key={ item }
            value={ item }
            className='display-inline-flex justify-between mt-5'
            control={ <Radio /> }
            labelPlacement='start'
            label={ (
              <h4 className='h4'>
                {courseReviewsFilterStatus[ item ]}
              </h4>
            ) }
          />
        ))}
      </RadioGroup>
    </Popover>
  )
}

CourseReviewsFilterModal.defaultProps = {
  anchorEl: null,
  id: undefined,
}

CourseReviewsFilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape(PropTypes.any),
  setAnchorEl: PropTypes.func.isRequired,
  id: PropTypes.string,
}

export default CourseReviewsFilterModal
