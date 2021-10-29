import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Radio, Popover, RadioGroup, FormControlLabel,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { updateViewAllCoursesFilter } from '../../../../redux-saga/redux/actions'
import { courseFilterStatus } from '../constants'
import '../styles.scss'

const CourseFilterModal = ({
  open, handleClose, anchorEl, setAnchorEl, id,
}) => {
  const { courseFilter } = useSelector((state) => state.viewAllCourses)

  const dispatch = useDispatch()

  const setStatus = useCallback((event) => {
    const checkedStatus = event.target.value
    dispatch(updateViewAllCoursesFilter({
      courseFilter: checkedStatus,
      currentPage: 1,
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
        value={ courseFilter }
        onChange={ setStatus }
      >
        {Object.keys(courseFilterStatus).map((item) => (
          <FormControlLabel
            key={ item }
            value={ item }
            className='display-inline-flex justify-between mt-5'
            control={ <Radio /> }
            labelPlacement='start'
            label={ (
              <h4 className='h4'>
                {courseFilterStatus[ item ]}
              </h4>
            ) }
          />
        ))}
      </RadioGroup>
    </Popover>
  )
}

CourseFilterModal.defaultProps = {
  anchorEl: null,
  id: null,
}

CourseFilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func.isRequired,
  id: PropTypes.string,
}

export default CourseFilterModal
