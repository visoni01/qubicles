import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { formatDate } from '../../../../../utils/common'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'

const IncompleteCoursesList = ({
  className, requiredCourses,
}) => {
  const history = useHistory()
  return (
    <div className={ `${ className } incomplete-courses-list-root` }>
      <div className='para mb-10'>This course requires to complete the following course(s) first:</div>
      {requiredCourses.filter((requiredCourse) => requiredCourse.status !== 'completed')
        .map((requiredCourse) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            role='button'
            tabIndex={ 0 }
            key={ requiredCourse.courseId }
            className='incomplete-courses-list-item'
            onClick={ () => history.push(`${ VIEW_COURSE_ROUTE }/${ requiredCourse.courseId }`) }
          >
            <span className='para mr-5 course-title'>{requiredCourse.courseTitle}</span>
            <span className='para light'>
              {`(${ requiredCourse.creatorName }, ${ formatDate(requiredCourse.createdAt, 'YYYY') })`}
            </span>
          </div>
        ))}
    </div>
  )
}

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
