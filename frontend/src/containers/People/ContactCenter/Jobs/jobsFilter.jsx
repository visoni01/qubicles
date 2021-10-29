import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Radio, Popover, RadioGroup, FormControlLabel,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { updateJobsFilter } from '../../../../redux-saga/redux/actions'
import { jobFilterStatus } from '../constants'
import '../styles.scss'

const JobFilterModal = ({
  open, handleClose, anchorEl, setAnchorEl, id,
}) => {
  const { selectedCategoryId, searchField, status } = useSelector((state) => state.jobsWithCategories)

  const dispatch = useDispatch()

  const setStatusCB = useCallback((event) => {
    const checkedStatus = event.target.value
    dispatch(updateJobsFilter({
      categoryId: selectedCategoryId,
      searchKeyword: searchField,
      status: checkedStatus,
      statusTitle: jobFilterStatus[ checkedStatus ],
    }))
    setTimeout(() => {
      setAnchorEl(null)
    }, 400)
  }, [ dispatch, selectedCategoryId, searchField, setAnchorEl ])

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
        value={ status }
        onChange={ setStatusCB }
      >
        {Object.keys(jobFilterStatus).map((item) => (
          <FormControlLabel
            key={ item }
            value={ item }
            className='display-inline-flex justify-between mt-5'
            control={ <Radio /> }
            labelPlacement='start'
            label={ (
              <h4 className='h4'>
                {item !== 'all' ? jobFilterStatus[ item ] : 'All Jobs'}
              </h4>
            ) }
          />
        ))}
      </RadioGroup>
    </Popover>
  )
}

JobFilterModal.defaultProps = {
  anchorEl: null,
  id: null,
}

JobFilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func.isRequired,
  id: PropTypes.string,
}

export default JobFilterModal
