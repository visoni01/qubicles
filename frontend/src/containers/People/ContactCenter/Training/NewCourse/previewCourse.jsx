import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import CourseDescription from '../ViewCourse/CourseDescription'
import CourseOverview from '../ViewCourse/CourseOverview'
import NewCourseActions from './NewCourseActions'
import CourseActions from '../ViewCourse/CourseActions'

const PreviewCreateCourse = ({
  informationSection, contentSection, courseContent,
  isPreview, setIsPreview, updateCourseReducer, course,
}) => (
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
          description={ informationSection.description }
          goals={ informationSection.goals }
          outcomes={ informationSection.outcomes }
          requirements={ informationSection.requirements }
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
          courseId={ course.courseId }
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

PreviewCreateCourse.propTypes = {
  informationSection: PropTypes.shape({
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.number,
    visibility: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    goals: PropTypes.string.isRequired,
    outcomes: PropTypes.string.isRequired,
    requirements: PropTypes.string.isRequired,
    requiredCourses: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  isPreview: PropTypes.bool.isRequired,
  contentSection: PropTypes.shape({}).isRequired,
  setIsPreview: PropTypes.func.isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  updateCourseReducer: PropTypes.func.isRequired,
  course: PropTypes.shape({
    courseId: PropTypes.number.isRequired,
  }).isRequired,
}

export default PreviewCreateCourse
