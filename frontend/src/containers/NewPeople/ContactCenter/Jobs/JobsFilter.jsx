import React, {
  useState, useCallback, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import {
  Radio,
  Popover,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'
import '../styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import { newJobCategoriesFetchStart, updateJobsFilter } from '../../../../redux-saga/redux/actions'

const JobFilterModal = ({
  open, handleClose, anchorEl, setAnchorEl, id,
}) => {
  const { selectedCategoryId, searchField, status } = useSelector((state) => state.newJobCategories)
  const dispatch = useDispatch()

  const [ jobStatus, setJobStatus ] = useState(status)
  const setStatusCB = useCallback((event) => {
    const checkedStatus = event.target.value
    setJobStatus(checkedStatus)
  }, [ ])

  useEffect(() => {
    dispatch(newJobCategoriesFetchStart({
      categoryId: selectedCategoryId,
      searchKeyword: searchField,
      status: jobStatus,
    }))
    dispatch(updateJobsFilter({
      categoryId: selectedCategoryId,
      searchKeyword: searchField,
      status: jobStatus,
    }))
    setAnchorEl(null)
    // eslint-disable-next-line
  }, [ dispatch, jobStatus ])

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
        value={ jobStatus }
        onChange={ setStatusCB }
      >
        <FormControlLabel
          value='all'
          className='display-inline-flex justify-between mt-5'
          control={ <Radio /> }
          labelPlacement='start'
          label={
            <h4 className='h4'> All Jobs </h4>
        }
        />
        <FormControlLabel
          value='recruiting'
          className='display-inline-flex justify-between mt-5'
          control={ <Radio /> }
          labelPlacement='start'
          label={
            <h4 className='h4'> Open Jobs </h4>
        }
        />
        <FormControlLabel
          value='hired'
          className='display-inline-flex justify-between mt-5'
          control={ <Radio /> }
          labelPlacement='start'
          label={
            <h4 className='h4'> Hired Positions </h4>
        }
        />
        <FormControlLabel
          value='cancelled'
          className='display-inline-flex justify-between mt-5'
          control={ <Radio /> }
          labelPlacement='start'
          label={
            <h4 className='h4'> Cancelled Jobs </h4>
      }
        />
        <FormControlLabel
          value='draft'
          className='display-inline-flex justify-between mt-5'
          control={ <Radio /> }
          labelPlacement='start'
          label={
            <h4 className='h4'>  Drafted Jobs </h4>
      }
        />
      </RadioGroup>
    </Popover>
  )
}

JobFilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape(PropTypes.any).isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default JobFilterModal
