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
} from './propTypes'
import CourseContentWrap from './CourseContentWrap'
import CourseOverviewSkeleton from '../Skeletons/courseOverviewSkeleton'

const CourseOverview = ({
  sections, courseId, isEnrolled, introVideo, courseTitle, courseStatus, openCoursePlayer, setOpenCoursePlayer,
  currentUnitIndex, currentSectionIndex, isIntroVideoActive, isSectionTestActive, type, isLoading, dataType,
}) => {
  if (_.isEqual(type, 'view')
  && ((_.isNull(isLoading) || isLoading) && (_.isEmpty(dataType) || _.isEqual(dataType, 'Course Info')))) {
    return (
      <CourseOverviewSkeleton />
    )
  }

  return (
    <>
      <Box className='custom-box course-overview-root'>
        <div className='heading-section'>
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
}

CourseOverview.propTypes = {
  sections: sectionsPropType.isRequired,
  courseId: courseIdPropType,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  courseTitle: courseTitlePropType.isRequired,
  courseStatus: courseStatusPropType,
  setOpenCoursePlayer: setOpenCoursePlayerPropType.isRequired,
  currentUnitIndex: currentUnitIndexPropType,
  currentSectionIndex: currentSectionIndexPropType,
  isIntroVideoActive: isIntroVideoActivePropType,
  isSectionTestActive: isSectionTestActivePropType,
  openCoursePlayer: openCoursePlayerPropType,
  type: typePropType,
  isLoading: isLoadingPropType,
  dataType: dataTypePropType,
}

export default CourseOverview
