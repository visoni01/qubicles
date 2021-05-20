import React, { useState } from 'react'
import {
  Avatar, Button, Card, CardContent,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import './styles.scss'
import TestEntriesValidationModal from './testEntriesValidationModal'

const TestEntryCard = ({
  sectionTitle, sectionOrder, candidateName, candidatePic,
}) => {
  const [ openValidation, setOpenValidation ] = useState(false)

  return (
    <Card variant='outlined' className='test-entry-card-root'>
      <CardContent classes={ { root: 'card-content-root' } }>
        <div>
          <span className='h4'>{`Section ${ sectionOrder }: `}</span>
          <span className='h4 unbold light'>{sectionTitle}</span>
        </div>
        <div className='display-inline-flex align-items-center is-fullwidth mt-10'>
          <Avatar className='user-pic' alt={ candidateName } src={ candidatePic } />
          <p className='para user-name'>{candidateName}</p>
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

TestEntryCard.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  sectionOrder: PropTypes.number.isRequired,
  candidateName: PropTypes.string.isRequired,
  candidatePic: PropTypes.string.isRequired,
}

export default TestEntryCard
