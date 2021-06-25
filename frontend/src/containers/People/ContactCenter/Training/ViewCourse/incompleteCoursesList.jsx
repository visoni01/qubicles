import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../../../utils/common'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'

const IncompleteCoursesList = ({
  className, requiredCourses,
}) => (
  <div className={ `${ className } incomplete-courses-list-root` }>
    <div className='para mb-10'>This course requires to complete the following course(s) first:</div>
    {requiredCourses.filter((requiredCourse) => requiredCourse.status !== 'completed')
      .map((requiredCourse) => (
        <div key={ requiredCourse.courseId } className='incomplete-courses-list-item'>
          <Link
            className='para mr-5 primary-text-link'
            to={ `${ VIEW_COURSE_ROUTE }/${ requiredCourse.courseId }` }
            target='_blank'
          >
            {requiredCourse.courseTitle}
          </Link>
          <span className='para light'>
            {`(${ requiredCourse.creatorName }, ${ formatDate(requiredCourse.createdAt, 'YYYY') })`}
          </span>
        </div>
      ))}
  </div>
)

IncompleteCoursesList.defaultProps = {
  className: '',
  requiredCourses: [],
}

IncompleteCoursesList.propTypes = {
  requiredCourses: PropTypes.arrayOf(PropTypes.shape({
    courseId: PropTypes.number.isRequired,
    courseTitle: PropTypes.string.isRequired,
    creatorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  className: PropTypes.string,
}

export default IncompleteCoursesList
