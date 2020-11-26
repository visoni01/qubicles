/* eslint-disable react/forbid-prop-types */
import React from 'react'
import {
  Box, Button, Divider, Chip,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import './styles.scss'
import { JOB_ROUTE } from '../../../../routes/routesPath'
import { getTimeFromNow } from '../../../../utils/common'
import JobsApplication from './JobApplication'
import JobPostSkeleton from '../SkeletonLoader/JobPostSkeleton'

const JobPost = ({
  jobId, courses, jobDetails, isLoading,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const history = useHistory()

  if (isLoading) {
    return (
      <JobPostSkeleton />
    )
  }
  return (
    <>
      <Box className='custom-box job-post-root'>
        <div className='display-inline-flex is-fullwidth'>
          <h3 className='h3 job-post-heading'>
            {jobDetails.title}
          </h3>

          { userDetails.user_id === jobDetails.jobPostOwnerId && (
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ () => history.push(`${ JOB_ROUTE }/${ jobId }/edit`) }
          >
            Edit Post
          </Button>
          )}

        </div>
        <p className='para light'>
          Posted
          {' '}
          {getTimeFromNow(jobDetails.createdOn)}
        </p>
        <Divider className='divider' />

        <div className='job-post-description is-fullwidth display-inline-flex'>
          <h4 className='h4 margin-top-bottom-10 text-link'>
            {' '}
            {jobDetails.categoryName}
            {' '}
          </h4>
          <p className='para' dangerouslySetInnerHTML={ { __html: jobDetails.description } } />
        </div>
        <Divider className='divider' />

        <div className='display-inline-flex job-post-specifications is-fullwidth'>
          <div>
            <h4 className='h4'>
              $
              {jobDetails.payAmount}
              /hr
            </h4>
            <p className='para'>Payment</p>
            <h4 className='h4 mt-20'>
              {jobDetails.durationMonths === 0 ? null : jobDetails.durationMonths }
              {' '}
              {_.capitalize(jobDetails.durationType)}
            </h4>
            <p className='para'>Duration</p>
          </div>
          <div>
            <h4 className='h4'>{_.capitalize(jobDetails.jobType)}</h4>
            <p className='para'>Job Type</p>
            <h4 className='h4 mt-20'>{_.capitalize(jobDetails.locationType)}</h4>
            <p className='para'>Location</p>
          </div>
          <div>
            <h4 className='h4'>{_.capitalize(jobDetails.experienceType)}</h4>
            <p className='para'>Experience Level</p>
            <h4 className='h4 mt-20'>
              {jobDetails.fulfilled}
              {jobDetails.needed}
            </h4>
            <p className='para'>Needed</p>
          </div>
        </div>

        <div>
          <h3 className='h3 mt-10'> Required Skills</h3>
          <div className='tags-set mb-20'>
            { jobDetails.jobSkillsData
              && jobDetails.jobSkillsData.map((tag) => (
                (tag.skill_preference === 'required')
                  ? (<Chip key={ tag.job_skill_id } label={ tag[ 'XQodSkill.skill_name' ] } className='tag-chip' />)
                  : null
              ))}
          </div>
          <h3 className='h3 mt-10'> Bonus Skills</h3>
          <div className='tags-set mb-20'>
            { jobDetails.jobSkillsData
              && jobDetails.jobSkillsData.map((tag) => (
                (tag.skill_preference === 'plus')
                  ? (<Chip key={ tag.job_skill_id } label={ tag[ 'XQodSkill.skill_name' ] } className='tag-chip' />)
                  : null
              ))}
          </div>
        </div>
        <div className='display-inline-flex course-section is-fullwidth'>
          <h3 className='h3 mt-15 mb-10'> Required Course</h3>
          <div className='mb-10'>
            <span className='primary-text-link mr-10'>
              {courses.requiredCourses[ 0 ].courseName}
            </span>
            <p className='para light'>
              {courses.requiredCourses[ 0 ].courseAuthor}
            </p>
            <span className='primary-text-link mr-10'>
              { courses.requiredCourses[ 1 ].courseName}
            </span>
            <p className='para light'>
              {courses.requiredCourses[ 0 ].courseAuthor}
            </p>
          </div>
          <h3 className='h3 mt-10 mb-10'> Bonus Course </h3>
          <div className='mb-10'>
            <span className='primary-text-link mr-10'>
              { courses.bonusCourses.courseName}
            </span>
            <p className='para light'>
              { courses.bonusCourses.courseAuthor}
            </p>
          </div>
        </div>
      </Box>

      <JobsApplication />
    </>
  )
}

JobPost.propTypes = {
  jobId: PropTypes.string.isRequired,
  jobDetails: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default JobPost
