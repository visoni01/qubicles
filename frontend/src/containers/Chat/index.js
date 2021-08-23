import React, { useState, useCallback, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import MiddleSection from './MiddleSection'
import NewConversationBox from './MiddleSection/newConversationBox'
import { chatDataRequestStart, resetAllChatsReducer, resetConversations } from '../../redux-saga/redux/chat'

const ChatSection = () => {
  const { currentChatId } = useSelector((state) => state.chatData)
  const dispatch = useDispatch()

  const [ messageText, setMessageText ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')

  const handleGroupNameChange = useCallback(({ newGroupName, oldGroupName }) => {
    if (!_.isEqual(newGroupName, oldGroupName)) {
      dispatch(chatDataRequestStart({
        requestType: 'UPDATE',
        dataType: 'change-group-name',
        conversationId: currentChatId,
        newGroupName,
        oldGroupName,
      }))
    }
  }, [ dispatch, currentChatId ])

  useEffect(() => {
    setMessageText('')
    setImageUrl('')
  }, [ currentChatId ])

  useEffect(() => () => {
    dispatch(resetConversations())
    dispatch(resetAllChatsReducer())
  }, [ dispatch ])

  return (
    <div>
      <Grid container spacing={ 3 } justify='center'>
        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          <LeftSection
            conversationId={ currentChatId }
          />
        </Grid>

        <Grid item xl={ 6 } lg={ 6 } md={ 9 } sm={ 12 } xs={ 12 }>
          {currentChatId
            ? (
              <MiddleSection
                conversationId={ currentChatId }
                messageText={ messageText }
                setMessageText={ setMessageText }
                imageUrl={ imageUrl }
                setImageUrl={ setImageUrl }
              />
            )
            : <NewConversationBox />}
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          {(currentChatId) && (
            <RightSection
              changeGroupName={ handleGroupNameChange }
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default ChatSection
