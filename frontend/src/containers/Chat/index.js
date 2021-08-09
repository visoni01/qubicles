import React, { useState, useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import MiddleSection from './MiddleSection'

const ChatSection = () => {
  const [ conversationId, setConversationId ] = useState(null)
  const { chat } = useSelector((state) => state.currentChat)

  const handleGroupNameChange = useCallback(() => {
  }, [])

  return (
    <div>
      <Grid container spacing={ 3 } justify='center'>
        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          <LeftSection conversationId={ conversationId } setConversationId={ setConversationId } />
        </Grid>

        <Grid item xl={ 6 } lg={ 6 } md={ 9 } sm={ 12 } xs={ 12 }>
          {(conversationId || (chat && chat.conversationId))
          && <MiddleSection conversationId={ (conversationId || (chat && chat.conversationId)) } />}
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          {(conversationId || (chat && chat.conversationId)) && (
            <RightSection
              groupName='Incognito Group'
              changeGroupName={ handleGroupNameChange }
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default ChatSection
