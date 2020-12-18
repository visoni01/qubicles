import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { InputBase, debounce } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { updateJobsFilter } from '../../../../redux-saga/redux/actions'

export default function JobsSearch() {
  const dispatch = useDispatch()
  const { selectedCategoryId, status, searchField } = useSelector((state) => state.newJobCategories)
  const [ searchJobsField, setSearchJobsField ] = useState(searchField)

  const searchJobsApi = useCallback(debounce((nextValue) => {
    dispatch(updateJobsFilter({
      searchKeyword: nextValue,
      categoryId: selectedCategoryId,
      status,
    }))
  }, 500), [ dispatch, selectedCategoryId, status ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchJobsField(nextValue)
    searchJobsApi(nextValue)
  }, [ searchJobsApi ])

  return (
    <div className='search-input'>
      <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
      <InputBase
        placeholder='Search Jobs'
        className='input-field'
        onChange={ handleSearch }
        value={ searchJobsField }
      />
    </div>
  )
}
