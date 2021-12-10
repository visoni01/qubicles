/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  TextField, Avatar, Button, debounce,
} from '@material-ui/core'
import _ from 'lodash'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon } from '../../assets/images/common'
import { userSearchStart, clearSearchResults } from '../../redux-saga/redux/user/searchUsers'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../routes/routesPath'
import { USERS } from '../../utils/constants'
import UniversalSearchCardSkeleton from './Skeletons/universalSearch/universalSearchCardSkeleton'

export default function UniversalSearch() {
  const [ inputValue, setInputValue ] = useState('')

  const {
    usersList, offset, resultCount, loading,
  } = useSelector((state) => state.searchUsers)

  const searchRef = useRef()
  const dispatch = useDispatch()

  const searchUsers = useCallback(debounce((nextValue) => {
    if (!_.isEmpty(nextValue)) {
      dispatch(userSearchStart({ searchString: nextValue, offset }))
    }
  }, 500), [ dispatch ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value.trim()
    searchUsers(nextValue)
  }, [ searchUsers ])

  const handleViewMore = useCallback(() => {
    const searchString = searchRef.current.value.trim()
    if (!_.isEmpty(searchString)) {
      dispatch(userSearchStart({
        searchString,
        offset: offset + 5,
      }))
    }
  }, [ dispatch, offset ])

  const changeInputValue = useCallback((event, value) => {
    setInputValue(value)
    if (_.isEmpty(value)) {
      dispatch(clearSearchResults())
    }
  }, [ dispatch ])

  const filterOptions = createFilterOptions({ trim: true })

  const loadingSkeleton = [
    { name: 'none1', groupName: 'loading' },
    { name: 'none2', groupName: 'loading' },
    { name: 'none3', groupName: 'loading' },
  ]

  return (
    <Autocomplete
      open
      freeSolo
      loading={ loading }
      value={ null }
      inputValue={ inputValue }
      onInputChange={ changeInputValue }
      options={
        resultCount === 0
          ? !inputValue
            ? loading ? [ ...usersList, ...loadingSkeleton ]
              : usersList
            : [ { name: '', groupName: 'no-option' } ]
          : loading ? [ ...usersList, ...loadingSkeleton ]
            : usersList
      }
      className='universal-search-input-field display-inline-flex is-halfwidth height-fit-content'
      autoHighlight
      getOptionLabel={ (option) => option.name }
      groupBy={ (option) => option.groupName }
      renderGroup={ (option) => (
        <div key={ option.group } className='universal-search'>
          {(option.group === 'results' || option.group === 'loading') && option.children}
          {!loading && usersList.length < resultCount && (
            <div className='actions'>
              <Button
                onClick={ handleViewMore }
                classes={ {
                  root: 'button-primary-text light',
                  label: 'button-primary-text-label primary-text-link',
                } }
              >
                View More ...
              </Button>
            </div>
          )}
          {option.group === 'no-option' && <div className='actions'> No Results Found </div>}
        </div>
      ) }
      filterOptions={ (resultCount === 0 && inputValue) || loading
        ? (option) => option
        : filterOptions }
      renderOption={ (user) => (
        user.groupName === 'results' ? (
          <Link
            className='universal-search-details-box'
            to={ `${ user.userType === USERS.EMPLOYER
              ? COMPANY_PROFILE_ROUTE : PROFILE_ROUTE }/${ user.userType === USERS.EMPLOYER
              ? user.clientId : user.userId }/feed` }
            target='_blank'
          >
            <Avatar className='profile-pic medium' alt={ user.name } src={ user.profileImage } />
            <span className='universal-search-user-details'>
              <span className='h4'>{ `${ user.name } ${ user.userId }` }</span>
              <FontAwesomeIcon className='custom-fa-icon sz-8x light' icon={ faCircle } />
              <span className='para light text-capitalize'>
                { ` ${ user.userType === USERS.EMPLOYER ? 'company' : user.userType } ` }
              </span>
              { user.title && <FontAwesomeIcon className='custom-fa-icon sz-8x light' icon={ faCircle } /> }
              { user.title && <span className='para'>{` ${ user.title } `}</span> }
            </span>
          </Link>
        ) : <UniversalSearchCardSkeleton />
      ) }
      classes={ {
        popper: 'universal-search-popper',
        option: 'universal-search-option',
      } }
      renderInput={ (params) => (
        <TextField
          inputRef={ searchRef }
          { ...params }
          label={ null }
          fullWidth
          onChange={ handleSearch }
          placeholder='Search'
          variant='outlined'
          InputProps={ {
            ...params.InputProps,
            startAdornment: <SearchIcon className='ml-10 mr-10 align-self-center' />,
          } }
        />
      ) }
    />
  )
}
