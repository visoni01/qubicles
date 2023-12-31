import React, { useState, useCallback, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import MiddleSection from './MiddleSection'
import NoConversationBox from './MiddleSection/noConversationBox'
import { chatDataRequestStart, resetAllChatsReducer, resetConversations } from '../../redux-saga/redux/chat'
import { REQUEST_TYPES } from '../../utils/constants'
import { CHANGE_GROUP_NAME } from '../../redux-saga/redux/constants'

const ChatSection = () => {
  const [ messageText, setMessageText ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')

  const { isLoading, initialFetchDone } = useSelector((state) => state.allChats)
  const { currentChatId } = useSelector((state) => state.chatData)

  const dispatch = useDispatch()

  useEffect(() => {
    setMessageText('')
    setImageUrl('')
  }, [ currentChatId ])

  useEffect(() => () => {
    dispatch(resetConversations())
    dispatch(resetAllChatsReducer())
  }, [ dispatch ])

  const handleGroupNameChange = useCallback(({ newGroupName, oldGroupName }) => {
    if (!_.isEqual(newGroupName, oldGroupName)) {
      dispatch(chatDataRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: CHANGE_GROUP_NAME,
        conversationId: currentChatId,
        newGroupName,
        oldGroupName,
      }))
    }
  }, [ dispatch, currentChatId ])

  return (
    <div>
      <Grid container spacing={ 3 } justify='center'>
        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          <LeftSection conversationId={ currentChatId } />
        </Grid>

        <Grid item xl={ 6 } lg={ 6 } md={ 9 } sm={ 12 } xs={ 12 }>
          {_.isNull(isLoading) || isLoading || currentChatId
            ? (
              <MiddleSection
                conversationId={ currentChatId }
                messageText={ messageText }
                setMessageText={ setMessageText }
                imageUrl={ imageUrl }
                setImageUrl={ setImageUrl }
                isLoading={ _.isNull(isLoading) || isLoading }
              />
            )
            : <NoConversationBox />}
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          {(currentChatId || !initialFetchDone) && <RightSection changeGroupName={ handleGroupNameChange } />}
        </Grid>
      </Grid>
    </div>
  )
}

export default ChatSection
