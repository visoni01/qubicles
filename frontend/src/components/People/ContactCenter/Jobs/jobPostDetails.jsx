/* eslint-disable complexity */
import React from 'react'
import { Divider, Chip } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import JobPostSkeleton from '../SkeletonLoader/Jobs/jobPostSkeleton'
import { checkJobType, formatDate } from '../../../../utils/common'
import { VIEW_COURSE_ROUTE } from '../../../../routes/routesPath'
import { jobDetailsPropTypes } from '../../../../containers/People/ContactCenter/Jobs/jobsValidator'
import './styles.scss'

const JobPostDetails = ({ jobDetails, isLoading }) => {
  if (isLoading) {
    return <JobPostSkeleton />
  }

  return (
    <>
      <div className='job-post-description is-fullwidth display-inline-flex'>
        <h4 className='h4 margin-top-bottom-10 text-link'>{jobDetails.categoryName}</h4>
        {/* eslint-disable-next-line react/no-danger */}
        <p className='para' dangerouslySetInnerHTML={ { __html: jobDetails.description } } />
      </div>
      <Divider className='divider' />

      <div className='display-inline-flex job-post-specifications is-fullwidth'>
        <div>
          <h4 className='h4'>{`$${ jobDetails.payAmount }/hr `}</h4>
          <p className='para'> Payment </p>
          <h4 className='h4 mt-20'>
            {jobDetails.durationMonths === 0 ? null : jobDetails.durationMonths }
            {' '}
            {_.capitalize(jobDetails.durationType)}
          </h4>
          <p className='para'> Duration </p>
        </div>
        <div>
          <h4 className='h4'>{checkJobType(jobDetails.jobType)}</h4>
          <p className='para'> Job Type </p>
          <h4 className='h4 mt-20'>{_.capitalize(jobDetails.locationType) || 'Remote'}</h4>
          <p className='para'> Location </p>
        </div>
        <div>
          <h4 className='h4'>{_.capitalize(jobDetails.experienceType)}</h4>
          <p className='para'> Experience Level </p>
          <h4 className='h4 mt-20'>{jobDetails.needed}</h4>
          <p className='para'> Needed </p>
        </div>
      </div>

      <div>
        <h3 className='h3 mt-10'> Required Skills </h3>
        <div className='tags-set mb-20'>
          {jobDetails.jobSkillsData && jobDetails.jobSkillsData.requiredSkills.map((tag) => (
            (tag.skillPreference === 'required')
              ? <Chip key={ tag.jobSkillId } label={ tag.skillName } className='tag-chip' />
              : null
          ))}
        </div>
        {jobDetails.jobSkillsData && jobDetails.jobSkillsData.bonusSkills
        && jobDetails.jobSkillsData.bonusSkills.length > 0 && (
          <>
            <h3 className='h3 mt-10'> Bonus Skills </h3>
            <div className='tags-set mb-20'>
              {jobDetails.jobSkillsData.bonusSkills.map((tag) => (
                (tag.skillPreference === 'plus')
                  ? <Chip key={ tag.jobSkillId } label={ tag.skillName } className='tag-chip' />
                  : null
              ))}
            </div>
          </>
        )}
      </div>

      <div className='display-inline-flex course-section is-fullwidth'>
        {jobDetails.jobCoursesData && jobDetails.jobCoursesData.requiredCourses
        && jobDetails.jobCoursesData.requiredCourses.length > 0 && (
          <>
            <h3 className='h3 mt-15 mb-10'> Required Course </h3>
            <div className='mb-10'>
              {jobDetails.jobCoursesData.requiredCourses.map((course) => (
                <div key={ course.jobCourseId }>
                  <Link
                    to={ `${ VIEW_COURSE_ROUTE }/${ course.courseId }` }
                    target='_blank'
                    className='primary-text-link'
                  >
                    {course.courseTitle}
                  </Link>
                  <p className='para light mb-10'>
                    {`${ course.creatorName }, ${ formatDate(course.createdAt, 'YYYY') }`}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        {jobDetails.jobCoursesData && jobDetails.jobCoursesData.bonusCourses
        && jobDetails.jobCoursesData.bonusCourses.length > 0 && (
          <>
            <h3 className='h3 mt-15 mb-10'> Bonus Course </h3>
            <div className='mb-10'>
              {jobDetails.jobCoursesData.bonusCourses.map((course) => (
                <div key={ course.jobCourseId }>
                  <Link
                    to={ `${ VIEW_COURSE_ROUTE }/${ course.courseId }` }
                    target='_blank'
                    className='primary-text-link'
                  >
                    {course.courseTitle}
                  </Link>
                  <p className='para light mb-10'>
                    {`${ course.creatorName }, ${ formatDate(course.createdAt, 'YYYY') }`}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

JobPostDetails.defaultProps = {
  isLoading: null,
}

JobPostDetails.propTypes = {
  jobDetails: jobDetailsPropTypes.isRequired,
  isLoading: PropTypes.bool,
}

export default JobPostDetails
