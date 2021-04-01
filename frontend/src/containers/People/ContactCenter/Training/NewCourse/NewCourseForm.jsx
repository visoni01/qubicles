import React, { useState } from 'react'
import {
  Box, Tabs, Tab,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import InformationTab from './InformationTab'
import ContentTab from './ContentTab'

const NewCourseForm = ({
  informationDetails, setInformationDetails, contentDetails, setContentDetails,
  courseContent, setCourseContent,
}) => {
  const [ activeTab, setActiveTab ] = useState(1)

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
        informationDetails={ informationDetails }
        setInformationDetails={ setInformationDetails }
      />
      ) }
      { activeTab === 1 && (
      <ContentTab
        contentDetails={ contentDetails }
        setContentDetails={ setContentDetails }
        courseContent={ courseContent }
        setCourseContent={ setCourseContent }
      />
      )}
    </Box>

  )
}
NewCourseForm.propTypes = {
  informationDetails: PropTypes.shape({}).isRequired,
  setInformationDetails: PropTypes.func.isRequired,
  contentDetails: PropTypes.shape({}).isRequired,
  setContentDetails: PropTypes.func.isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  setCourseContent: PropTypes.func.isRequired,
}
export default NewCourseForm
