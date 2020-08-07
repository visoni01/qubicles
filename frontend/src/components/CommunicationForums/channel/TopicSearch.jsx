import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { channelTopicsListFetchingStart } from '../../../redux-saga/redux/actions'

const TopicSearchBar = ({ channelId }) => {
  const [ searchField, setSearchField ] = useState('')
  const dispatch = useDispatch()

  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(channelTopicsListFetchingStart({ channelId, searchKeyword: nextValue }))
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
        placeholder='Search Topics...'
        onChange={ handleSearch }
        value={ searchField }
      />
      <div className='search-icon'>
        <FontAwesomeIcon icon={ faSearch } />
      </div>
    </div>
  )
}

TopicSearchBar.propTypes = {
  channelId: PropTypes.number.isRequired,
}

export default TopicSearchBar
