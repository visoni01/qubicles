import React, { useState, useCallback } from 'react'
import {
  Button, List, ListItem, ListItemIcon,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import CourseDescriptionSkeleton from
  '../../../../../components/People/ContactCenter/SkeletonLoader/Training/courseDescriptionSkeleton'
import { formatDate } from '../../../../../utils/common'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'
import { ErrorIcon, SuccessIcon } from '../../../../../assets/images/training'

const CourseDescription = ({
  title,
  description,
  goals,
  outcomes,
  requirements,
  requiredCourses,
  dataType,
  isLoading,
  type,
}) => {
  const [ showFullDescription, setShowFullDescription ] = useState(false)
  const history = useHistory()

  let descriptionButtonName
  if (showFullDescription) {
    descriptionButtonName = 'Close Full Description'
  } else {
    descriptionButtonName = 'View Full Description'
  }

  const handleFullDescriptionCB = useCallback(
    // eslint-disable-next-line no-shadow
    () => setShowFullDescription((showFullDescription) => !showFullDescription), [],
  )

  if (_.isEqual(type, 'view')
  && ((_.isNull(isLoading) || isLoading) && (_.isEmpty(dataType) || _.isEqual(dataType, 'Course Info')))) {
    return (
      <CourseDescriptionSkeleton />
    )
  }

  return (
    <>
      <div className='custom-box course-description-root has-fullwidth'>
        <h3 className='h3'>
          {title}
        </h3>
        <h4 className='h4 mt-10 '> Description </h4>
        <p className='para  mb-10'>
          {description}
        </p>

        {showFullDescription && (
        <div>
          <h4 className='h4 mt-10 '> Goals </h4>
          <p className='para mb-10'>
            {goals}
          </p>
          <h4 className='h4 mt-10 '> Outcomes </h4>
          <p className='para mb-10'>
            {outcomes}
          </p>
          <h4 className='h4 mt-10 '> Requirements</h4>
          <div className='ml-20'>
            <p className='para requirements-list-item'>
              {requirements}
            </p>
            {!_.isEmpty(requiredCourses) && (
            <div className='para requirements-list-item mt-10 mb-10'>
              Completed following course(s):
              {requiredCourses.map((requiredCourse) => (
                <List key={ requiredCourse.courseId } disablePadding>
                  <ListItem
                    disableGutters
                    classes={ { root: 'pt-5 no-padding-bottom' } }
                    onClick={ () => history.push(`${ VIEW_COURSE_ROUTE }/${ requiredCourse.courseId }`) }
                  >
                    <span className='para bold mr-5 course-title'>{requiredCourse.courseTitle}</span>
                    <span className='para light'>
                      {`(${ requiredCourse.creatorName }, ${ formatDate(requiredCourse.createdAt, 'YYYY') })`}
                    </span>
                    <ListItemIcon className='ml-10'>
                      {requiredCourse.status === 'completed' ? <SuccessIcon /> : <ErrorIcon />}
                    </ListItemIcon>
                  </ListItem>
                </List>
              ))}
            </div>
            )}
          </div>
        </div>
        )}
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
          onClick={ handleFullDescriptionCB }
        >
          { descriptionButtonName }
        </Button>
      </div>
    </>
  )
}

CourseDescription.defaultProps = {
  title: 'Title',
  description: 'description',
  goals: 'goals',
  outcomes: 'outcomes',
  requirements: 'requirements',
  dataType: '',
  isLoading: false,
  type: 'view',
  requiredCourses: [],
}

CourseDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  goals: PropTypes.string,
  outcomes: PropTypes.string,
  requirements: PropTypes.string,
  dataType: PropTypes.string,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  requiredCourses: PropTypes.arrayOf(PropTypes.shape({
    courseId: PropTypes.number.isRequired,
    courseTitle: PropTypes.string.isRequired,
    creatorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
}

export default CourseDescription
