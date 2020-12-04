import React, { useCallback, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { InputBase, debounce } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { newJobCategoriesFetchStart, updateJobsFilter } from '../../../../redux-saga/redux/actions'

export default function JobsSearch() {
  const dispatch = useDispatch()
  const { selectedCategoryId } = useSelector((state) => state.newJobCategories)
  const [ searchJobsField, setSearchJobsField ] = useState('')

  console.log('CATEGORY++++', selectedCategoryId)

  const searchJobsApi = useCallback(debounce((nextValue) => {
    dispatch(newJobCategoriesFetchStart({ categoryId: selectedCategoryId, searchKeyword: nextValue }))

    dispatch(updateJobsFilter({
      searchKeyword: searchJobsField,
    }))
  }, 500), [ dispatch ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchJobsField(nextValue)
    searchJobsApi(nextValue)
  }, [ dispatch ])

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
