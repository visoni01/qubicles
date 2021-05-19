import React, { useState } from 'react'
import {
  Avatar, Button, Card, CardContent,
} from '@material-ui/core'
import './styles.scss'
import { terry } from '../../../../../../assets/images/avatar'
import TestEntriesValidationModal from './testEntriesValidationModal'

const TestEntryCard = () => {
  const [ openValidation, setOpenValidation ] = useState(false)

  return (
    <Card variant='outlined' className='test-entry-card-root'>
      <CardContent classes={ { root: 'card-content-root' } }>
        <div>
          <span className='h4'>Section 1: </span>
          <span className='h4 unbold light'>About Our Company</span>
        </div>
        <div className='display-inline-flex align-items-center is-fullwidth mt-10'>
          <Avatar className='user-pic' alt={ terry } src={ terry } />
          <p className='para user-name'>Terry Valdez</p>
          <Button
            className='review-button'
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            onClick={ () => setOpenValidation(true) }
          >
            Review
          </Button>
        </div>
      </CardContent>
      <TestEntriesValidationModal
        open={ openValidation }
        setOpen={ setOpenValidation }
      />
    </Card>
  )
}

export default TestEntryCard
