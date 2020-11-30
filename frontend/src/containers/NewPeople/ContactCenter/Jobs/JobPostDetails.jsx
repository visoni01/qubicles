import React from 'react'
import { Divider, Chip } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './styles.scss'
import JobPostSkeleton from '../SkeletonLoader/JobPostSkeleton'

const JobPostDetails = ({
  courses, jobDetails, isLoading,
}) => {
  if (isLoading) {
    return (
      <JobPostSkeleton />
    )
  }

  return (
    <>
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
          <h4 className='h4 mt-20'>{_.capitalize(jobDetails.locationType) || 'Remote'}</h4>
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
              && jobDetails.jobSkillsData.requiredSkills.map((tag) => (
                (tag.skillPreference === 'required')
                  ? (<Chip key={ tag.jobSkillId } label={ tag.skillName } className='tag-chip' />)
                  : null
              ))}
        </div>
        <h3 className='h3 mt-10'> Bonus Skills</h3>
        <div className='tags-set mb-20'>
          {/* { jobDetails.jobSkillsData
              && jobDetails.jobSkillsData.bonusSkills.map((tag) => (
                (tag.skillPreference === 'plus')
                  ? (<Chip key={ tag.jobSkillId } label={ tag.skillName } className='tag-chip' />)
                  : null
              ))} */}
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
    </>
  )
}

JobPostDetails.defaultProps = {
  isLoading: null,
}

JobPostDetails.propTypes = {
  jobDetails: PropTypes.shape(PropTypes.any).isRequired,
  courses: PropTypes.shape(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
}

export default JobPostDetails
