import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import NewCourseForm from './NewCourseForm'
import NewCourseActions from './NewCourseActions'
import './styles.scss'
import { updateTrainingCourseDetails } from '../../../../../redux-saga/redux/people'

const NewCourse = () => {
  const { course } = useSelector((state) => state.trainingCourse)
  const [ informationDetails, setInformationDetails ] = useState(course.informationSection)
  const [ contentDetails, setContentDetails ] = useState(course.contentSection)
  const [ courseContent, setCourseContent ] = useState(course.courseContent)
  const dispatch = useDispatch()

  const { userDetails } = useSelector((state) => state.login)

  const updateCourseReducer = useCallback(() => {
    dispatch(updateTrainingCourseDetails({
      course: {
        informationSection: informationDetails,
        contentSection: contentDetails,
        courseContent,
      },
    }))
  }, [ informationDetails, contentDetails, courseContent, dispatch ])

  useEffect(() => {
    setInformationDetails((current) => ({
      ...current,
      creatorId: userDetails.user_id,
    }))
  }, [ userDetails.user_id ])

  return (
    (
      <Grid container spacing={ 3 }>
        <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 12 }>
          <NewCourseForm
            informationDetails={ informationDetails }
            setInformationDetails={ setInformationDetails }
            contentDetails={ contentDetails }
            setContentDetails={ setContentDetails }
            courseContent={ courseContent }
            setCourseContent={ setCourseContent }
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 12 }>
          <NewCourseActions
            updateCourseReducer={ updateCourseReducer }
            informationDetails={ informationDetails }
            contentDetails={ contentDetails }
            courseContent={ courseContent }
          />
        </Grid>
      </Grid>
    )
  )
}

export default NewCourse
