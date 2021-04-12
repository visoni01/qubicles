import React, { useState } from 'react'
import {
  Box, Tabs, Tab,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import InformationTab from './InformationTab'
import ContentTab from './ContentTab'

const NewCourseForm = ({
  informationSection, setInformationSection, contentSection, setContentSection,
  courseContent, setCourseContent,
}) => {
  const [ activeTab, setActiveTab ] = useState(0)

  return (
    <Box className='custom-box new-course-wrapper'>
      <h2 className='h2'> New Course </h2>
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
NewCourseForm.propTypes = {
  informationSection: PropTypes.shape({}).isRequired,
  setInformationSection: PropTypes.func.isRequired,
  contentSection: PropTypes.shape({}).isRequired,
  setContentSection: PropTypes.func.isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  setCourseContent: PropTypes.func.isRequired,
}
export default NewCourseForm
