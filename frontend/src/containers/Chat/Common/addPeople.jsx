/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable complexity */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react'
import PropTypes from 'prop-types'
import {
  Button, Chip, debounce, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../loaders/circularLoader'
import PersonCard from './personCard'
import {
  allChatsRequestStart, chatDataRequestStart, chatSuggestionsFetchStart, resetChatSuggestionsReducer,
} from '../../../redux-saga/redux/chat'
import SuggestedUsersSkeleton from '../../../components/Chat/Skeletons/suggestedUsersSkeleton'

const AddPeople = ({
  open, handleCancel, actionType, conversationId, loading,
}) => {
  const [ selectedPeople, setSelectedPeople ] = useState([])
  const [ groupTitle, setGroupTitle ] = useState('')
  const {
    users: people, more, offset, searchKeyword, isLoading,
  } = useSelector((state) => state.chatSuggestions)
  const dispatch = useDispatch()
  const observer = useRef()

  // Initial Fetch
  useEffect(() => {
    dispatch(chatSuggestionsFetchStart({
      offset: 0,
      searchKeyword: '',
      conversationId,
    }))

    return () => dispatch(resetChatSuggestionsReducer())
  }, [ dispatch, conversationId ])

  // Search Users
  const searchUsers = useCallback(debounce((nextValue) => {
    dispatch(chatSuggestionsFetchStart({
      offset: 0,
      searchKeyword: nextValue,
      conversationId,
    }))
  }, 500), [ dispatch ])

  const addPerson = useCallback((event) => {
    if (!loading && actionType !== 'NEW_CHAT') {
      const personCard = event.target.closest('.person-card')
      if (personCard && personCard.id) {
        const person = _.find(people, { id: parseInt(personCard.id, 10) })
        setSelectedPeople((state) => ([
          ...state,
          person,
        ]))
      }
    }
  }, [ actionType, people, loading ])

  const removePerson = useCallback((id) => {
    if (!loading) {
      setSelectedPeople((state) => {
        const index = _.findIndex(state, { id })
        if (index !== -1) {
          return [
            ...state.slice(0, index),
            ...state.slice(index + 1),
          ]
        }
        return state
      })
    }
  }, [ loading ])

  const handleCloseModal = useCallback(() => {
    setSelectedPeople([])
    setGroupTitle('')
    handleCancel()
  }, [ handleCancel ])

  const handleDone = useCallback(() => {
    switch (actionType) {
      case 'NEW_GROUP': {
        dispatch(allChatsRequestStart({
          requestType: 'CREATE',
          dataType: 'new-group',
          title: !groupTitle || _.isEmpty(groupTitle.trim()) ? '' : groupTitle.trim(),
          members: selectedPeople,
        }))
        break
      }

      case 'ADD_PEOPLE': {
        dispatch(chatDataRequestStart({
          requestType: 'UPDATE',
          dataType: 'add-people',
          members: selectedPeople,
          conversationId,
        }))
        break
      }

      default:
    }
  }, [ dispatch, actionType, groupTitle, selectedPeople, conversationId ])

  const createNewChat = useCallback((event) => {
    if (!loading) {
      const personCard = event.target.closest('.person-card')
      if (personCard && personCard.id) {
        const person = _.find(people, { id: parseInt(personCard.id, 10) })
        dispatch(allChatsRequestStart({
          requestType: 'CREATE',
          dataType: 'new-chat',
          candidate: person,
        }))
      }
    }
  }, [ dispatch, people, loading ])

  const handleObserver = useCallback((entries) => {
    const target = entries[ 0 ]
    if (target?.isIntersecting && more) {
      dispatch(chatSuggestionsFetchStart({
        offset: offset + 10,
        searchKeyword,
        conversationId,
      }))
    }
  }, [ dispatch, more, searchKeyword, offset, conversationId ])

  // Lazy loading and infinite scrolling
  const endRef = useCallback((node) => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    }
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(handleObserver, option)
    if (node) observer.current.observe(node)
  }, [ handleObserver ])

  return (
    <Dialog
      scroll='paper'
      open={ open }
      onClose={ handleCloseModal }
      maxWidth='sm'
      fullWidth
      className='custom-modal auto-height add-people-modal'
      classes={ {
        paperWidthSm: 'paper',
        scrollPaper: 'scroll-paper',
      } }
    >
      <div className='header'>
        <DialogTitle className='is-fullwidth'>
          <div className='display-inline-flex align-items-center'>
            <div className='h2'>
              {
                (actionType === 'ADD_PEOPLE' && 'Add People')
                || (actionType === 'NEW_CHAT' && 'New Chat')
                || (actionType === 'NEW_GROUP' && 'New Group')
              }
            </div>
            {loading && (
              <Loader
                className='static-small-loader'
                enableOverlay={ false }
                displayLoaderManually
                size={ 25 }
              />
            )}
          </div>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleCloseModal }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        {actionType === 'NEW_GROUP' && (
        <div className='mb-20'>
          <div className='h3'>Group Title</div>
          <TextField
            variant='outlined'
            margin='dense'
            className='is-fullwidth'
            placeholder='Group title (optional)'
            onChange={ (e) => setGroupTitle(e.target.value) }
          />
        </div>
        )}
        {actionType === 'NEW_GROUP' && (
          <div className='h3'>Add People</div>
        )}
        <TextField
          className='is-fullwidth search-text-field'
          variant='outlined'
          margin='dense'
          placeholder='Search people...'
          onChange={ (e) => searchUsers(e.target.value) }
        />
        <div className='tags-set'>
          {selectedPeople.map((selectedPerson) => (
            <Chip
              size='small'
              key={ selectedPerson.id }
              onDelete={ () => removePerson(selectedPerson.id) }
              label={ selectedPerson.name }
              className='tag-chip'
            />
          ))}
        </div>

        <div>
          <div className='h4 mt-20 mb-10'>Suggestions</div>
          <div
            className={ `suggestion-cards ${ actionType === 'NEW_GROUP' ? 'new-group' : '' }` }
            onClick={ actionType === 'NEW_CHAT' ? createNewChat : addPerson }
          >
            {(!isLoading || offset !== 0) && people && people.length > 0
            && _.differenceBy(people, selectedPeople, 'id').map((person, index) => (
              <div
                key={ person.id }
                ref={ index === _.differenceBy(people, selectedPeople, 'id').length - 1 ? endRef : null }
              >
                <PersonCard
                  id={ person.id }
                  name={ person.name }
                  title={ person.title }
                  profilePic={ person.profilePic }
                  loading={ loading }
                />
                {index !== people.length - 1 && <Divider className='user-list-divider' />}
              </div>
            ))}
            {isLoading && <SuggestedUsersSkeleton />}
            {!isLoading && people
              && (people.length === 0 || _.differenceBy(people, selectedPeople, 'id').length === 0) && (
              <div className='para'>No suggestions available...</div>
            )}
          </div>
        </div>
      </DialogContent>
      {actionType !== 'NEW_CHAT' && (
      <DialogActions className='modal-actions'>
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ handleCloseModal }
          disabled={ loading }
        >
          Cancel
        </Button>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ handleDone }
          disabled={ loading || selectedPeople.length === 0 }
        >
          Done
        </Button>
      </DialogActions>
      )}
    </Dialog>
  )
}

AddPeople.defaultProps = {
  open: false,
  actionType: 'ADD_PEOPLE',
  conversationId: null,
  loading: false,
}

AddPeople.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
  actionType: PropTypes.string,
  conversationId: PropTypes.number,
  loading: PropTypes.bool,
}

export default AddPeople
