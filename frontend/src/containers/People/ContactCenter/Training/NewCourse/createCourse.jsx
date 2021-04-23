import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import NewCourseForm from './NewCourseForm'
import NewCourseActions from './NewCourseActions'

const CreateCourse = ({
  informationSection, setInformationSection,
  contentSection, setContentSection,
  courseContent, setCourseContent,
  updateCourseReducer, isPreview, setIsPreview,
  course,
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
          courseId={ course.courseId }
        />
      </Grid>
    </Grid>
  </Grid>
)

CreateCourse.propTypes = {
  informationSection: PropTypes.shape({}).isRequired,
  setInformationSection: PropTypes.func.isRequired,
  contentSection: PropTypes.shape({}).isRequired,
  setContentSection: PropTypes.func.isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  setCourseContent: PropTypes.func.isRequired,
  updateCourseReducer: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  course: PropTypes.shape({
    courseId: PropTypes.number.isRequired,
  }).isRequired,
}

export default CreateCourse
