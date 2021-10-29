import React, { useCallback, useState } from 'react'
import { InputBase, debounce } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { updateJobsFilter } from '../../../../redux-saga/redux/actions'
import { SearchIcon } from '../../../../assets/images/common'

const JobsSearch = () => {
  const { selectedCategoryId, status, searchField } = useSelector((state) => state.jobsWithCategories)

  const [ searchJobsField, setSearchJobsField ] = useState(searchField)

  const dispatch = useDispatch()

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
    <div className='display-inline-flex is-fullwidth search-input'>
      <SearchIcon className='ml-10 mr-10 align-self-center' />
      <InputBase
        placeholder='Search Jobs'
        className='input-field'
        onChange={ handleSearch }
        value={ searchJobsField }
      />
    </div>
  )
}

export default JobsSearch
