import React, { useState } from 'react'
import { Box, Divider } from '@material-ui/core'
import ContactMainActiveTabs from './contactMainActiveTab'
import NotesTab from './ActiveCallTabs/notesTab'
import CallbackTab from './ActiveCallTabs/callbackTab'
import HistoryTab from './ActiveCallTabs/historyTab'

const ContactMainTabsWrapper = () => {
  const [ activeTab, setActiveTab ] = useState(4)
  return (
    <Box className='custom-box no-padding'>
      <ContactMainActiveTabs
        activeTab={ activeTab }
        setActiveTab={ setActiveTab }
      />
      <Divider className='divider' />
      {activeTab === 2 && (
        <div className='padding-20'>
          <NotesTab />
        </div>
      )}
      {activeTab === 3 && (
        <div className='padding-20'>
          <CallbackTab />
        </div>
      )}
      {activeTab === 4 && (
        <div className='padding-20 no-padding-top'>
          <HistoryTab />
        </div>
      )}
    </Box>
  )
}

export default ContactMainTabsWrapper
