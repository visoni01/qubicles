import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Button, Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ROUTE_PATHS from '../../../../../../routes/routesPath'
import TestEntryCard from './testEntryCard'
import { testEntriesRequestStart } from '../../../../../../redux-saga/redux/people'

const TestEntries = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  let { courseId } = useParams()
  courseId = parseInt(courseId, 10)
  const { courseTestEntries, isLoading, dataType } = useSelector((state) => state.testEntries)

  useEffect(() => {
    dispatch(testEntriesRequestStart({
      requestType: 'FETCH',
      dataType: 'All Test Entries',
      courseId,
    }))
  }, [ dispatch, courseId ])

  return (
    <Box className='custom-box test-entries-box'>
      <div className='mb-30'>
        <Button
          onClick={ () => history.push(ROUTE_PATHS.MY_COURSES) }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='custom-fa-icon white mr-10' />
          Back
        </Button>
      </div>
      <div className='mb-20'>
        <h2 className='h2 mb-30'>
          {courseTestEntries.courseTitle}
        </h2>
        <h3 className='h3 mb-10'>{`Test Entries (${ courseTestEntries.testEntries.length })`}</h3>
        <p className='para light'>
          {'Some answers in your tests need manual validation.'
          + ' Please check the test entries of the following participants.'}
        </p>
      </div>
      <div>
        {courseTestEntries && courseTestEntries.testEntries && courseTestEntries.testEntries.length > 0 && (
        <Grid container spacing={ 3 }>
          {courseTestEntries.testEntries.map((testEntry) => (
            <Grid
              key={ `${ testEntry.sectionId }.${ testEntry.candidateId }` }
              item
              xl={ 4 }
              lg={ 4 }
              md={ 6 }
              sm={ 12 }
            >
              <TestEntryCard
                sectionId={ testEntry.sectionId }
                sectionTitle={ testEntry.sectionTitle }
                sectionOrder={ testEntry.sectionOrder }
                candidateId={ testEntry.candidateId }
                candidateName={ testEntry.candidateName }
                candidatePic={ testEntry.candidatePic }
                testEntryAnswers={ testEntry.testEntryAnswers }
                courseId={ courseId }
                isLoading={ isLoading }
                dataType={ dataType }
              />
            </Grid>
          ))}
        </Grid>
        )}
        {courseTestEntries && courseTestEntries.testEntries && courseTestEntries.testEntries.length === 0 && (
          <p className='para sz-xl bold'>
            No test entries found for this course...
          </p>
        )}
      </div>
    </Box>
  )
}

export default TestEntries
