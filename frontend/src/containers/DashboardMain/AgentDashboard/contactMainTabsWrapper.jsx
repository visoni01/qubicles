import React, { useState } from 'react'
import { Box, Divider } from '@material-ui/core'
import ContactMainActiveTabs from './contactMainActiveTab'
import NotesTab from './ActiveCallTabs/notesTab'

const ContactMainTabsWrapper = () => {
  const [ activeTab, setActiveTab ] = useState(2)
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
    </Box>
  )
}

export default ContactMainTabsWrapper
