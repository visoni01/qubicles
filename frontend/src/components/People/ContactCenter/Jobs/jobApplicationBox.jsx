import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import JobApplicationCard from './jobApplicationCard'

const JobApplicationBox = ({ applicationList, categoryName }) => (
  <Box className='mt-30 custom-box job-application-root'>
    <h3 className='h3'>
      {`${ categoryName } (${ applicationList.length })`}
    </h3>

    {applicationList.map((jobApplication) => (
      <JobApplicationCard
        key={ jobApplication.application.applicationId }
        application={ jobApplication.application }
        userDetails={ jobApplication.userDetails }
        categoryName={ categoryName }
      />
    ))}

    {(applicationList && applicationList.length === 0) && (
      <div className='mt-10 mb-10'>
        <div className='text-align-last-center'>
          <h3 className=' h3'> No applications found! </h3>
        </div>
      </div>
    ) }
  </Box>
)

JobApplicationBox.propTypes = {
  applicationList: PropTypes.arrayOf(PropTypes.any).isRequired,
  categoryName: PropTypes.string.isRequired,
}

export default JobApplicationBox
