import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Loader from '../../loaders/circularLoader'
import PersonCard from '../Common/personCard'
import { chatDataRequestStart } from '../../../redux-saga/redux/chat'
import { groupMembersPropTypes } from '../propTypes'
import { REQUEST_TYPES } from '../../../utils/constants'
import { REMOVE_PERSON, VIEW_MEMBERS } from '../../../redux-saga/redux/constants'

const ViewMembers = ({
  open, handleClose, members, conversationId, isRemoved,
}) => {
  const [ sortedMembersList, setSortedMembersList ] = useState(members)

  const { userDetails } = useSelector((state) => state.login)
  const { conversations } = useSelector((state) => state.chatData)

  const dispatch = useDispatch()

  useEffect(() => {
    if (members && members.length) {
      let newMembersList = members.filter((item) => userDetails && _.isEqual(item.id, userDetails.user_id))
      newMembersList = [
        ...newMembersList,
        ..._.sortBy(_.difference(members, newMembersList), (item) => item.name),
      ]

      setSortedMembersList(newMembersList)
    }
  }, [ members, userDetails ])

  const handleRemove = useCallback(({ id, name }) => {
    dispatch(chatDataRequestStart({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: REMOVE_PERSON,
      conversationId,
      candidateId: id,
      name,
    }))
  }, [ dispatch, conversationId ])

  const currentConversation = conversations?.find((conversation) => conversation.data.conversationId === conversationId)
  const dataType = currentConversation?.dataType
  const isLoading = currentConversation?.isLoading

  return (
    <Dialog
      scroll='paper'
      open={ open }
      onClose={ handleClose }
      maxWidth='sm'
      fullWidth
      className='custom-modal auto-height view-members-modal'
    >
      <div className='header'>
        <DialogTitle className='is-fullwidth'>
          <div className='display-inline-flex align-items-center'>
            <div className='h2'> Members </div>

            {isLoading && _.isEqual(dataType, REMOVE_PERSON) && (
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
            onClick={ handleClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>

      <DialogContent>
        <div>
          {sortedMembersList && sortedMembersList.map((person, index) => (
            <div key={ person.id }>
              <PersonCard
                id={ person.id }
                clientId={ person.clientId }
                name={ person.name }
                title={ person.title }
                profilePic={ person.profilePic }
                userCode={ person.userCode }
                actionType={ VIEW_MEMBERS }
                handleRemove={ handleRemove }
                isRemoved={ isRemoved }
                loading={ isLoading && _.isEqual(dataType, REMOVE_PERSON) }
              />
              {index !== sortedMembersList.length - 1 && <Divider className='user-list-divider' />}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

ViewMembers.defaultProps = {
  open: false,
  isRemoved: false,
}

ViewMembers.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  conversationId: PropTypes.number.isRequired,
  members: groupMembersPropTypes.isRequired,
  isRemoved: PropTypes.bool,
}

export default ViewMembers
