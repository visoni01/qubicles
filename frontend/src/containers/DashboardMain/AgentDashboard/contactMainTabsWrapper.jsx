import React, { useState } from 'react'
import { Box, Divider } from '@material-ui/core'
import ContactMainActiveTabs from './contactMainActiveTab'
import NotesTab from './ActiveCallTabs/notesTab'
import CallbackTab from './ActiveCallTabs/callbackTab'

const ContactMainTabsWrapper = () => {
  const [ activeTab, setActiveTab ] = useState(3)
  return (
    <Box className='custom-box no-padding'>
      <ContactMainActiveTabs
        activeTab={ activeTab }
        setActiveTab={ setActiveTab }
      />
      <Divider className='divider' />
      <div className='padding-20'>
        {activeTab === 2 && (
        <NotesTab />
        )}
      </div>
      <div className='padding-20 no-padding-top'>
        {activeTab === 3 && (
        <CallbackTab />
        )}
      </div>
    </Box>
  )
}

export default ContactMainTabsWrapper
