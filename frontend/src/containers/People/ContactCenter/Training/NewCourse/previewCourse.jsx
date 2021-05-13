import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import CourseDescription from '../ViewCourse/CourseDescription'
import NewCourseActions from './NewCourseActions'
import {
  contentSectionPropType, courseContentPropType, coursePropType, informationSectionPropType,
} from './propTypes'
import CourseOverview from '../ViewCourse/CourseOverview'
import CourseActions from '../ViewCourse/CourseActions'

const PreviewCreateCourse = ({
  informationSection, contentSection, courseContent,
  isPreview, setIsPreview, updateCourseReducer, course, handleErrors,
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
        <CourseOverview
          sections={ course.courseContent.sections }
          courseId={ course.courseId }
          isEnrolled={ course.isEnrolled }
          introVideo={ course.contentSection.introductionVideo }
          courseTitle={ course.informationSection.title }
          courseStatus={ course.courseDetails && course.courseDetails.status }
          currentUnitIndex={ course.currentUnitIndex }
          currentSectionIndex={ course.currentSectionIndex }
          isIntroVideoActive={ course.isIntroVideoActive }
          isSectionTestActive={ course.isSectionTestActive }
          type='preview'
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
          courseStatus={ course.status }
          handleErrors={ handleErrors }
        />
      </Grid>
      <Grid item>
        <CourseActions
          course={ course }
          type='preview'
        />
      </Grid>
    </Grid>
  </Grid>
)

PreviewCreateCourse.propTypes = {
  informationSection: informationSectionPropType.isRequired,
  isPreview: PropTypes.bool.isRequired,
  contentSection: contentSectionPropType.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  courseContent: courseContentPropType.isRequired,
  updateCourseReducer: PropTypes.func.isRequired,
  course: coursePropType.isRequired,
  handleErrors: PropTypes.func.isRequired,
}

export default PreviewCreateCourse
