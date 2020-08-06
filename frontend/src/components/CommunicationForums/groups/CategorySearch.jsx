import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { categoryDataFetchingStart } from '../../../redux-saga/redux/actions'

const CategorySearchBar = ({ currentPage, noOfGroupsPerPage }) => {
  const [ searchField, setSearchField ] = useState('')
  const dispatch = useDispatch()

  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(categoryDataFetchingStart({
      searchKeyword: nextValue,
      limit: noOfGroupsPerPage,
      offset: (currentPage - 1) * noOfGroupsPerPage,
    }))
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
        placeholder='Search Forum Groups...'
        onChange={ handleSearch }
        value={ searchField }
      />
      <div className='search-icon'>
        <FontAwesomeIcon icon={ faSearch } />
      </div>
    </div>
  )
}

CategorySearchBar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  noOfGroupsPerPage: PropTypes.number.isRequired,
}

export default CategorySearchBar
