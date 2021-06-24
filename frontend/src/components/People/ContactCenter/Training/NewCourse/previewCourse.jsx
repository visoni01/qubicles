import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import CourseDescription from '../../../../../containers/People/ContactCenter/Training/ViewCourse/CourseDescription'
import NewCourseActions from '../../../../../containers/People/ContactCenter/Training/NewCourse/NewCourseActions'
import {
  contentSectionPropType, courseContentPropType, coursePropType, informationSectionPropType,
} from '../../../../../containers/People/ContactCenter/Training/NewCourse/propTypes'
import CourseOverview from '../ViewCourse/CourseOverview'
import CourseActions from '../../../../../containers/People/ContactCenter/Training/ViewCourse/CourseActions'

const PreviewCreateCourse = ({
  informationSection, contentSection, courseContent,
  isPreview, setIsPreview, updateCourseReducer, course, handleErrors, isLoading, requestType, success, isCreator,
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
          isLoading={ isLoading }
          type='preview'
          isCreator={ isCreator }
        />
      </Grid>
      <Grid item>
        <CourseOverview
          sections={ courseContent.sections }
          courseId={ course.courseId }
          isEnrolled={ course.isEnrolled }
          introVideo={ contentSection.introductionVideo }
          courseTitle={ informationSection.title }
          courseStatus={ course.courseDetails && course.courseDetails.status }
          currentUnitIndex={ course.currentUnitIndex }
          currentSectionIndex={ course.currentSectionIndex }
          isIntroVideoActive={ course.isIntroVideoActive }
          isSectionTestActive={ course.isSectionTestActive }
          isLoading={ isLoading }
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
          requestType={ requestType }
          success={ success }
        />
      </Grid>
      <Grid item>
        <CourseActions
          course={ {
            informationSection, contentSection, courseContent, updatedOn: course.updatedOn,
          } }
          type='preview'
        />
      </Grid>
    </Grid>
  </Grid>
)

PreviewCreateCourse.defaultProps = {
  requestType: '',
  success: false,
  isCreator: false,
}

PreviewCreateCourse.propTypes = {
  informationSection: informationSectionPropType.isRequired,
  isPreview: PropTypes.bool.isRequired,
  contentSection: contentSectionPropType.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  courseContent: courseContentPropType.isRequired,
  updateCourseReducer: PropTypes.func.isRequired,
  course: coursePropType.isRequired,
  handleErrors: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestType: PropTypes.string,
  success: PropTypes.bool,
  isCreator: PropTypes.bool,
}

export default PreviewCreateCourse
