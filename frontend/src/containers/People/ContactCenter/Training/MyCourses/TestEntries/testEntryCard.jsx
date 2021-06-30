import React, { useState } from 'react'
import {
  Avatar, Button, Card, CardContent,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import './styles.scss'
import _ from 'lodash'
import TestEntriesValidationModal from './testEntriesValidationModal'

const TestEntryCard = ({
  candidateName, candidatePic, candidateId, testType, sections, courseId,
  isLoading, dataType,
}) => {
  const [ openValidation, setOpenValidation ] = useState(false)

  return (
    <Card variant='outlined' className='test-entry-card-root'>
      <CardContent classes={ { root: 'card-content-root' } }>
        <div className='h4'>
          {_.isEqual(testType, 'assessment') ? 'Assessment Test' : 'Section Test'}
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
        candidateId={ candidateId }
        candidateName={ candidateName }
        candidatePic={ candidatePic }
        sections={ sections }
        courseId={ courseId }
        isLoading={ isLoading }
        dataType={ dataType }
        testType={ testType }
      />
    </Card>
  )
}

TestEntryCard.defaultProps = {
  sections: null,
}

TestEntryCard.propTypes = {
  candidateName: PropTypes.string.isRequired,
  candidatePic: PropTypes.string.isRequired,
  candidateId: PropTypes.number.isRequired,
  testType: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dataType: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    sectionId: PropTypes.number,
    sectionNum: PropTypes.number,
    sectionTitle: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape({
      questionId: PropTypes.number,
      candidateAnswer: PropTypes.string,
      questionText: PropTypes.string,
      questionType: PropTypes.string,
      correctAnswer: PropTypes.string,
    })),
  })),
}

export default TestEntryCard
