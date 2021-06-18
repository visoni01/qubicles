import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import NewCourseForm from './NewCourseForm'
import NewCourseActions from './NewCourseActions'
import {
  contentSectionPropType, courseContentPropType, coursePropType, errorsPropTypes, informationSectionPropType,
} from './propTypes'

const CreateCourse = ({
  informationSection, setInformationSection,
  contentSection, setContentSection,
  courseContent, setCourseContent,
  updateCourseReducer, isPreview, setIsPreview,
  course, isEdit, handleErrors, errors, requestType, success,
}) => (
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
          course={ course }
          informationSection={ informationSection }
          setInformationSection={ setInformationSection }
          contentSection={ contentSection }
          setContentSection={ setContentSection }
          courseContent={ courseContent }
          setCourseContent={ setCourseContent }
          isEdit={ isEdit }
          errors={ errors }
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
          courseId={ course.courseId }
          courseStatus={ course.status }
          handleErrors={ handleErrors }
          requestType={ requestType }
          success={ success }
        />
      </Grid>
    </Grid>
  </Grid>
)

CreateCourse.defaultProps = {
  isEdit: false,
  requestType: '',
  success: false,
}

CreateCourse.propTypes = {
  informationSection: informationSectionPropType.isRequired,
  setInformationSection: PropTypes.func.isRequired,
  contentSection: contentSectionPropType.isRequired,
  setContentSection: PropTypes.func.isRequired,
  courseContent: courseContentPropType.isRequired,
  setCourseContent: PropTypes.func.isRequired,
  updateCourseReducer: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  course: coursePropType.isRequired,
  isEdit: PropTypes.bool,
  errors: errorsPropTypes.isRequired,
  handleErrors: PropTypes.func.isRequired,
  requestType: PropTypes.string,
  success: PropTypes.bool,
}

export default CreateCourse
