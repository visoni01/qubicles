import React from 'react'
import { Box } from '@material-ui/core'
import ApplicationCard from './ApplicationCard'

export default function ApplicationsPage() {
  return (
    <div>
      <Box className='custom-box mb-30'>
        <ApplicationCard
          applicationType='Invitations'
        />
      </Box>
      <Box className='custom-box mb-30'>
        <ApplicationCard
          applicationType='Pretraining'
        />
      </Box>
      <Box className='custom-box mb-30'>
        <ApplicationCard
          applicationType='Pending'
        />
      </Box>
      <Box className='custom-box mb-30'>
        <ApplicationCard
          applicationType='Archived'
        />
      </Box>
    </div>
  )
}
