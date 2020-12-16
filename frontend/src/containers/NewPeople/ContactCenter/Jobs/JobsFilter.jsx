import React, {
  useState, useCallback, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import {
  Radio,
  ListItem,
  ListItemText,
  List,
  Popover,
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
  }, [ dispatch, jobStatus ])

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
      <List className='filter-list-items'>
        <ListItem className='permission-list-item'>
          <ListItemText classes={ { primary: 'list-item' } }>
            <h4 className='h4'> Open Jobs </h4>
          </ListItemText>
          <Radio
            checked={ jobStatus === 'recruiting' }
            onChange={ setStatusCB }
            value='recruiting'
            name='recruiting'
            color='primary'
            inputProps={ { 'aria-label': 'recruiting' } }
          />
        </ListItem>
        <ListItem className='permission-list-item'>
          <ListItemText classes={ { primary: 'list-item' } }>
            <h4 className='h4'> Hired Positions </h4>
          </ListItemText>
          <Radio
            checked={ jobStatus === 'hired' }
            onChange={ setStatusCB }
            value='hired'
            name='hired'
            color='primary'
            inputProps={ { 'aria-label': 'hired' } }
          />
        </ListItem>
        <ListItem className='permission-list-item'>
          <ListItemText classes={ { primary: 'list-item' } }>
            <h4 className='h4'> Cancelled Job Postings </h4>
          </ListItemText>
          <Radio
            checked={ jobStatus === 'cancelled' }
            onChange={ setStatusCB }
            value='cancelled'
            name='cancelled'
            color='primary'
            inputProps={ { 'aria-label': 'cancelled' } }
          />
        </ListItem>
        <ListItem className='permission-list-item'>
          <ListItemText classes={ { primary: 'list-item' } }>
            <h4 className='h4'> Drafted Jobs </h4>
          </ListItemText>
          <Radio
            checked={ jobStatus === 'draft' }
            onChange={ setStatusCB }
            value='draft'
            name='draft'
            color='primary'
            inputProps={ { 'aria-label': 'draft' } }
          />
        </ListItem>
      </List>
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
