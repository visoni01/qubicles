/* eslint-disable complexity */
import React from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@material-ui/core'
import _ from 'lodash'
import {
  sectionsPropType, courseIdPropType, isEnrolledPropType, introVideoPropType, courseTitlePropType, dataTypePropType,
  courseStatusPropType, setOpenCoursePlayerPropType, currentUnitIndexPropType, currentSectionIndexPropType,
  isIntroVideoActivePropType, isSectionTestActivePropType, openCoursePlayerPropType, typePropType, isLoadingPropType,
  isCreatorPropType,
} from '../../../../../containers/People/ContactCenter/Training/ViewCourse/propTypes'
import CourseContentWrap from '../../../../../containers/People/ContactCenter/Training/ViewCourse/CourseContentWrap'
import CourseOverviewSkeleton from
  '../../SkeletonLoader/Training/courseOverviewSkeleton'
import { COURSE_INFO } from '../../../../../redux-saga/redux/constants'

const CourseOverview = ({
  sections, courseId, isEnrolled, introVideo, courseTitle, courseStatus, openCoursePlayer, setOpenCoursePlayer,
  currentUnitIndex, currentSectionIndex, isIntroVideoActive, isSectionTestActive, type, isLoading, dataType, isCreator,
}) => {
  if (_.isEqual(type, 'view')
  && ((_.isNull(isLoading) || isLoading) && (_.isEmpty(dataType) || _.isEqual(dataType, COURSE_INFO)))) {
    return (
      <CourseOverviewSkeleton />
    )
  }

  return (
    <>
      <Box className='custom-box course-overview-root'>
        <div className='heading-section mb-20'>
          <h3 className='h3'>Overview</h3>
          <p className='contents para mt-10'>
            {`${ sections && !_.isEmpty(sections) && !_.isEmpty(sections[ 0 ].units) ? sections.length : 0 } sections`}
            <FontAwesomeIcon className='custom-fa-icon' icon={ faCircle } />
            {`${ sections.reduce(
              (totalUnits, section) => totalUnits + section.units.length,
              introVideo ? 1 : 0,
            ) } units`}
          </p>
        </div>
        {sections && !_.isEmpty(sections) && !_.isEmpty(sections[ 0 ].units) && !_.isEmpty(sections[ 0 ].units) && (
        <CourseContentWrap
          sections={ sections }
          courseId={ courseId }
          isEnrolled={ isEnrolled }
          introVideo={ introVideo }
          courseTitle={ courseTitle }
          courseStatus={ courseStatus }
          openCoursePlayer={ openCoursePlayer }
          setOpenCoursePlayer={ setOpenCoursePlayer }
          currentUnitIndex={ currentUnitIndex }
          currentSectionIndex={ currentSectionIndex }
          isIntroVideoActive={ isIntroVideoActive }
          isSectionTestActive={ isSectionTestActive }
          isLoading={ isLoading }
          dataType={ dataType }
          type={ type }
          isCreator={ isCreator }
        />
        )}
      </Box>
    </>
  )
}

CourseOverview.defaultProps = {
  courseStatus: '',
  currentUnitIndex: null,
  currentSectionIndex: null,
  isIntroVideoActive: null,
  isSectionTestActive: null,
  openCoursePlayer: false,
  type: 'view',
  dataType: '',
  courseId: null,
  isLoading: null,
  isCreator: false,
  introVideo: '',
  isEnrolled: false,
  setOpenCoursePlayer: () => {},
}

CourseOverview.propTypes = {
  sections: sectionsPropType.isRequired,
  courseId: courseIdPropType,
  isEnrolled: isEnrolledPropType,
  introVideo: introVideoPropType,
  courseTitle: courseTitlePropType.isRequired,
  courseStatus: courseStatusPropType,
  setOpenCoursePlayer: setOpenCoursePlayerPropType,
  currentUnitIndex: currentUnitIndexPropType,
  currentSectionIndex: currentSectionIndexPropType,
  isIntroVideoActive: isIntroVideoActivePropType,
  isSectionTestActive: isSectionTestActivePropType,
  openCoursePlayer: openCoursePlayerPropType,
  type: typePropType,
  isLoading: isLoadingPropType,
  dataType: dataTypePropType,
  isCreator: isCreatorPropType,
}

export default CourseOverview
