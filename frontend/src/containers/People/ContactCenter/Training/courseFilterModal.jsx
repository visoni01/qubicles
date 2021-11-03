import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Radio, Popover, RadioGroup, FormControlLabel,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { updateViewAllCoursesFilter } from '../../../../redux-saga/redux/actions'
import { updateCompanyCoursesFilter } from '../../../../redux-saga/redux/people'
import { courseFilterStatus } from '../constants'
import '../styles.scss'

const CourseFilterModal = ({
  open, handleClose, anchorEl, setAnchorEl, id, courseFilter, type,
}) => {
  const dispatch = useDispatch()

  const setStatus = useCallback((event) => {
    const checkedStatus = event.target.value
    const args = {
      courseFilter: checkedStatus,
      currentPage: 1,
    }

    if (_.isEqual(type, 'all')) {
      dispatch(updateViewAllCoursesFilter(args))
    } else if (_.isEqual(type, 'company')) {
      dispatch(updateCompanyCoursesFilter(args))
    }

    setTimeout(() => { setAnchorEl(null) }, 400)
  }, [ dispatch, setAnchorEl, type ])

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
  type: 'all',
  courseFilter: 'most-popular',
}

CourseFilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  courseFilter: PropTypes.string,
}

export default CourseFilterModal
