import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import NewCourseForm from './NewCourseForm'
import NewCourseActions from './NewCourseActions'
import './styles.scss'
import { updateTrainingCourseDetails } from '../../../../../redux-saga/redux/people'
import CourseDescription from '../ViewCourse/CourseDescription'
import CourseOverview from '../ViewCourse/CourseOverview'
import CourseActions from '../ViewCourse/CourseActions'

const NewCourse = () => {
  const { course } = useSelector((state) => state.trainingCourse)
  const [ informationSection, setInformationSection ] = useState(course.informationSection)
  const [ contentSection, setContentSection ] = useState(course.contentSection)
  const [ courseContent, setCourseContent ] = useState(course.courseContent)
  const [ isPreview, setIsPreview ] = useState(false)

  const dispatch = useDispatch()

  const { userDetails } = useSelector((state) => state.login)

  const updateCourseReducer = useCallback(() => {
    dispatch(updateTrainingCourseDetails({
      course: {
        informationSection,
        contentSection,
        courseContent,
      },
    }))
  }, [ informationSection, contentSection, courseContent, dispatch ])

  useEffect(() => {
    setInformationSection((current) => ({
      ...current,
      creatorId: userDetails.user_id,
    }))
  }, [ userDetails.user_id ])

  if (isPreview) {
    return (
      <Grid container spacing={ 2 }>
        <Grid
          container
          spacing={ 2 }
          direction='column'
          item
          xl={ 9 }
          lg={ 9 }
          md={ 12 }
          sm={ 12 }
          xs={ 12 }
        >
          <Grid item>
            <CourseDescription
              title={ informationSection.title }
              description={ informationSection.summary }
              goals={ informationSection.goals }
              outcomes={ informationSection.outcomes }
              preRequisites={ informationSection.preRequisites }
            />
          </Grid>
          <Grid item>
            <CourseOverview />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={ 2 }
          direction='column'
          item
          xl={ 3 }
          lg={ 3 }
          md={ 12 }
          sm={ 12 }
          xs={ 12 }
        >
          <Grid item>
            <NewCourseActions
              isPreview={ isPreview }
              setIsPreview={ setIsPreview }
              updateCourseReducer={ updateCourseReducer }
              informationSection={ informationSection }
              contentSection={ contentSection }
              courseContent={ courseContent }
            />
          </Grid>
          <Grid item>
            <CourseActions
              isPreview={ isPreview }
              course={ {
                informationSection,
                contentSection,
                courseContent,
              } }
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    (
      <Grid container spacing={ 2 }>
        <Grid
          container
          spacing={ 2 }
          direction='column'
          item
          xl={ 9 }
          lg={ 9 }
          md={ 9 }
          sm={ 12 }
        >
          <Grid item>
            <NewCourseForm
              informationSection={ informationSection }
              setInformationSection={ setInformationSection }
              contentSection={ contentSection }
              setContentSection={ setContentSection }
              courseContent={ courseContent }
              setCourseContent={ setCourseContent }
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={ 2 }
          direction='column'
          item
          xl={ 3 }
          lg={ 3 }
          md={ 3 }
          sm={ 12 }
        >
          <Grid item>
            <NewCourseActions
              updateCourseReducer={ updateCourseReducer }
              informationSection={ informationSection }
              contentSection={ contentSection }
              courseContent={ courseContent }
              isPreview={ isPreview }
              setIsPreview={ setIsPreview }
            />
          </Grid>
        </Grid>
      </Grid>
    )
  )
}

export default NewCourse
