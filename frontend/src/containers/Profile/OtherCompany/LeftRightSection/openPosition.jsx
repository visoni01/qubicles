import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Divider } from '@material-ui/core'
import OpenPositionsCard from './openPositionsCard'

export default function OpenPosition() {
  const { newJobCategories, isLoading } = useSelector((state) => state.newJobCategories)

  return (
    <Box className='custom-box'>
      <h3 className='h3'> Open Positions</h3>
      { newJobCategories.map((jobCategory) => (
        jobCategory.jobs.length && (
        <OpenPositionsCard
          key={ jobCategory.categoryId }
          categoryId={ jobCategory.categoryId }
          categoryTitle={ jobCategory.categoryTitle }
          jobs={ jobCategory.jobs }
        />
        )))}
      <Divider className='divider' />
      <div className=' mt-20 mb-20 is-flex is-center'>
        <Button classes={ {
          root: 'button-primary-text',
          label: 'button-primary-text-label',
        } }
        >
          View All Jobs
        </Button>
      </div>
    </Box>
  )
}
