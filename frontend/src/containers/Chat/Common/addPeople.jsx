/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import Loader from '../../loaders/circularLoader'
import { members as people } from '../testData'
import PersonCard from './personCard'
import { allChatsRequestStart } from '../../../redux-saga/redux/chat'

const AddPeople = ({ open, handleCancel, actionType }) => {
  const [ selectedPeople, setSelectedPeople ] = useState([])
  const [ groupTitle, setGroupTitle ] = useState('')
  const dispatch = useDispatch()

  const addPerson = useCallback((event) => {
    if (actionType !== 'NEW_CHAT') {
      const personCard = event.target.closest('.person-card')
      if (personCard && personCard.id) {
        const person = _.find(people, { id: parseInt(personCard.id, 10) })
        setSelectedPeople((state) => ([
          ...state,
          person,
        ]))
      }
    }
  }, [ actionType ])

  const removePerson = useCallback((id) => {
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
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedPeople([])
    setGroupTitle('')
    handleCancel()
  }, [ handleCancel ])

  const handleDone = useCallback(() => {
    switch (actionType) {
      case 'NEW_GROUP': {
        dispatch(allChatsRequestStart({
          requestType: 'UPDATE',
          dataType: 'new-group',
          title: !groupTitle || _.isEmpty(groupTitle.trim()) ? '' : groupTitle.trim(),
          members: selectedPeople,
        }))
        break
      }

      default:
    }
    handleCloseModal()
  }, [ dispatch, actionType, groupTitle, selectedPeople, handleCloseModal ])

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
            {false && (
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
            onClick={ addPerson }
          >
            {people && people.length && _.differenceBy(people, selectedPeople, 'id').map((person) => (
              <PersonCard
                key={ person.id }
                id={ person.id }
                name={ person.name }
                title={ person.title }
                profilePic={ person.profilePic }
              />
            ))}
            {people && (people.length === 0 || selectedPeople.length === people.length) && (
              <div className='para'>No suggestions available...</div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ handleCloseModal }
        >
          Cancel
        </Button>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ handleDone }
          disabled={ selectedPeople.length === 0 }
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddPeople.defaultProps = {
  open: false,
  actionType: 'ADD_PEOPLE',
}

AddPeople.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
  actionType: PropTypes.string,
}

export default AddPeople
