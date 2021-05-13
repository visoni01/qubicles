import React from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@material-ui/core'
import {
  sectionsPropType, courseIdPropType, isEnrolledPropType, introVideoPropType, courseTitlePropType,
  courseStatusPropType, setOpenCoursePlayerPropType, currentUnitIndexPropType, currentSectionIndexPropType,
  isIntroVideoActivePropType, isSectionTestActivePropType, openCoursePlayerPropType, typePropType,
} from './propTypes'
import CourseContentWrap from './CourseContentWrap'

const CourseOverview = ({
  sections, courseId, isEnrolled, introVideo, courseTitle, courseStatus, openCoursePlayer, setOpenCoursePlayer,
  currentUnitIndex, currentSectionIndex, isIntroVideoActive, isSectionTestActive, type,
}) => (
  <>
    <Box className='custom-box course-overview-root'>
      <div className='heading-section'>
        <h3 className='h3'>Overview</h3>
        <p className='contents para mt-10'>
          {`${ sections.length } sections`}
          <FontAwesomeIcon className='custom-fa-icon' icon={ faCircle } />
          {`${ sections.reduce(
            (totalUnits, section) => totalUnits + section.units.length,
            introVideo ? 1 : 0,
          ) } units`}
        </p>
      </div>
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
        type={ type }
      />
    </Box>
  </>
)

CourseOverview.defaultProps = {
  courseStatus: '',
  currentUnitIndex: null,
  currentSectionIndex: null,
  isIntroVideoActive: null,
  isSectionTestActive: null,
  openCoursePlayer: false,
  type: 'view',
}

CourseOverview.propTypes = {
  sections: sectionsPropType.isRequired,
  courseId: courseIdPropType.isRequired,
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
}

export default CourseOverview
