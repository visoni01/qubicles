import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import { jobCategoriesFetchStart } from '../../../redux-saga/redux/actions'

const JobSearchBar = () => {
  const [ searchField, setSearchField ] = useState('')
  const dispatch = useDispatch()

  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(jobCategoriesFetchStart({ searchKeyword: nextValue }))
  }, 500), [ dispatch ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchField(nextValue)
    callSearchApi(nextValue)
  }, [ callSearchApi ])

  return (
    <div className='control forum-search people-search-bar'>
      <input
        type='text'
        className='input is-rounded'
        placeholder='Search Jobs...'
        onChange={ handleSearch }
        value={ searchField }
      />

      <div className='search-icon'>
        <FontAwesomeIcon icon={ faSearch } />
      </div>
    </div>
  )
}

export default JobSearchBar
