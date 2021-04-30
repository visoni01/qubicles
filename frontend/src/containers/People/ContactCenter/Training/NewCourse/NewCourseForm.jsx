import React, { useState } from 'react'
import {
  Box, Tabs, Tab, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import InformationTab from './InformationTab'
import ContentTab from './ContentTab'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import { formatDate } from '../../../../../utils/common'
import { contentSectionPropType, courseContentPropType, informationSectionPropType } from './propTypes'

const NewCourseForm = ({
  course, informationSection, setInformationSection, contentSection, setContentSection,
  courseContent, setCourseContent, isEdit,
}) => {
  const [ activeTab, setActiveTab ] = useState(0)
  const history = useHistory()
  return (
    <Box className='custom-box new-course-wrapper'>
      <div className='mb-20'>
        {isEdit ? (
          <Button
            classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
            onClick={ () => history.push(ROUTE_PATHS.MY_COURSES) }
          >
            <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
            My Courses
          </Button>
        ) : (
          <Button
            classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
            onClick={ () => window.history.back() }
          >
            <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
            Back
          </Button>
        )}
      </div>
      {isEdit ? (
        <div>
          <div className='display-inline-flex align-items-center'>
            <h2 className='h2 mr-10'>
              Edit Course
            </h2>
            <span className='para light font-size-18x mt-5'>(Draft)</span>
          </div>
          <p className='para light'>
            Last updated on:
            {course && course.updatedOn && ` ${ formatDate(course.updatedOn, 'MMMM DD YYYY, hh:mm a') }`}
          </p>
        </div>
      ) : (
        <h2 className='h2'>
          New Course
        </h2>
      )}
      <div className='custom-active-tabs'>
        <Tabs
          value={ activeTab }
          onChange={ (_, tab) => setActiveTab(tab) }
        >
          <Tab label='Information' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
          <Tab label='Content' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
        </Tabs>
      </div>
      { activeTab === 0
      && (
      <InformationTab
        informationSection={ informationSection }
        setInformationSection={ setInformationSection }
      />
      ) }
      { activeTab === 1 && (
      <ContentTab
        contentSection={ contentSection }
        setContentSection={ setContentSection }
        courseContent={ courseContent }
        setCourseContent={ setCourseContent }
      />
      )}
    </Box>
  )
}

NewCourseForm.defaultProps = {
  isEdit: false,
}

NewCourseForm.propTypes = {
  course: PropTypes.shape({
    createdOn: PropTypes.string.isRequired,
    updatedOn: PropTypes.string.isRequired,
  }).isRequired,
  informationSection: informationSectionPropType.isRequired,
  setInformationSection: PropTypes.func.isRequired,
  contentSection: contentSectionPropType.isRequired,
  setContentSection: PropTypes.func.isRequired,
  courseContent: courseContentPropType.isRequired,
  setCourseContent: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
}
export default NewCourseForm
