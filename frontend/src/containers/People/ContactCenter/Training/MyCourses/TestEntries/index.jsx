/* eslint-disable complexity */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Button, Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import ROUTE_PATHS from '../../../../../../routes/routesPath'
import TestEntryCard from './testEntryCard'
import { resetTestEntriesReducer, testEntriesRequestStart } from '../../../../../../redux-saga/redux/people'
import TestEntriesSkeleton from
  '../../../../../../components/People/ContactCenter/SkeletonLoader/Training/testEntriesSkeleton'
import { REQUEST_TYPES } from '../../../../../../utils/constants'
import { ALL_TEST_ENTRIES } from '../../../../../../redux-saga/redux/constants'

const TestEntries = () => {
  const { courseTestEntries, isLoading, dataType } = useSelector((state) => state.testEntries)

  const history = useHistory()
  const dispatch = useDispatch()
  let { courseId } = useParams()
  courseId = parseInt(courseId, 10)

  useEffect(() => {
    dispatch(testEntriesRequestStart({
      requestType: REQUEST_TYPES.FETCH,
      dataType: ALL_TEST_ENTRIES,
      courseId,
    }))
    return () => {
      dispatch(resetTestEntriesReducer())
    }
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
      {[ '', ALL_TEST_ENTRIES ].includes(dataType) && (_.isNull(isLoading) || isLoading) && (
        <TestEntriesSkeleton />
      )}
      {!([ '', ALL_TEST_ENTRIES ].includes(dataType) && (_.isNull(isLoading) || isLoading)) && (
        <>
          <div className='mb-20'>
            <h2 className='h2 mb-30'>{courseTestEntries.courseTitle}</h2>
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
                  key={ `${ testEntry.candidateId }${ testEntry.testType }` }
                  item
                  xl={ 4 }
                  lg={ 4 }
                  md={ 6 }
                  sm={ 12 }
                >
                  <TestEntryCard
                    candidateId={ testEntry.candidateId }
                    candidateName={ testEntry.candidateName }
                    candidatePic={ testEntry.candidatePic }
                    testType={ testEntry.testType }
                    sections={ testEntry.sections }
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
        </>
      )}
    </Box>
  )
}

export default TestEntries
