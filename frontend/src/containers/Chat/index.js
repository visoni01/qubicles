import React, { useState, useCallback, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import MiddleSection from './MiddleSection'
import NewConversationBox from './MiddleSection/newConversationBox'
import { currentChatRequestStart, resetAllChatsReducer, resetCurrentChatReducer } from '../../redux-saga/redux/chat'

const ChatSection = () => {
  const { chat } = useSelector((state) => state.currentChat)
  const dispatch = useDispatch()

  const [ conversationId, setConversationId ] = useState(null)

  const handleGroupNameChange = useCallback(({ newGroupName, oldGroupName }) => {
    if (!_.isEqual(newGroupName, oldGroupName)) {
      dispatch(currentChatRequestStart({
        requestType: 'UPDATE',
        dataType: 'change-group-name',
        conversationId: chat.conversationId,
        newGroupName,
        oldGroupName,
      }))
    }
  }, [ dispatch, chat.conversationId ])

  useEffect(() => {
    setConversationId(chat.conversationId)
  }, [ chat.conversationId ])

  useEffect(() => () => {
    dispatch(resetAllChatsReducer())
    dispatch(resetCurrentChatReducer())
  }, [ dispatch ])

  return (
    <div>
      <Grid container spacing={ 3 } justify='center'>
        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          <LeftSection
            conversationId={ conversationId }
            setConversationId={ setConversationId }
          />
        </Grid>

        <Grid item xl={ 6 } lg={ 6 } md={ 9 } sm={ 12 } xs={ 12 }>
          {(conversationId || (chat && chat.conversationId))
            ? (
              <MiddleSection
                conversationId={ (conversationId || (chat && chat.conversationId)) }
              />
            )
            : <NewConversationBox />}
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          {(conversationId || (chat && chat.conversationId)) && (
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
