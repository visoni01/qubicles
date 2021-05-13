/* eslint-disable complexity */
import React from 'react'
import { List } from '@material-ui/core'
import UnitsList from './UnitsList'
import {
  sectionsPropType, isEnrolledPropType, introVideoPropType,
  setOpenCoursePlayerPropType, setCurrentSectionPropType, setCurrentUnitPropType,
  isCoursePlayerOpenPropType, sectionPropType, unitPropType, courseStatusPropType, courseIdPropType,
  isIntroVideoActivePropType, isSectionTestActivePropType,
} from './propTypes'

const CourseContents = ({
  sections, setOpenCoursePlayer, isEnrolled, introVideo, setCurrentSection, setCurrentUnit,
  currentSection, currentUnit, isCoursePlayerOpen, courseStatus, courseId,
  isIntroVideoActive, isSectionTestActive,
}) => (
  <>
    <div className='course-contents-root'>
      <List
        component='nav'
        aria-labelledby='overview-list'
        className='overview-list border-1'
      >
        {sections && sections.map((section, index) => (
          <div key={ section.id }>
            <UnitsList
              section={ section }
              sectionIndex={ index }
              setOpenCoursePlayer={ setOpenCoursePlayer }
              isEnrolled={ isEnrolled }
              isActive={
                (isCoursePlayerOpen && currentSection && currentSection.id === section.id)
                || (!isCoursePlayerOpen && isEnrolled && section.status === 'inprogress')
                || (!isEnrolled && index === 0)
                || (!isCoursePlayerOpen && isEnrolled
                  && (courseStatus === 'enrolled' || (courseStatus === 'inprogress' && section.status === ''))
                  && index === 0)
                || (index !== 0 && sections[ index - 1 ].status === 'completed'
                  && section.status === '')
              }
              showIntroVideo={ index === 0 && !!introVideo }
              introVideo={ introVideo }
              setCurrentSection={ setCurrentSection }
              setCurrentUnit={ setCurrentUnit }
              currentSection={ currentSection }
              currentUnit={ currentUnit }
              isCoursePlayerOpen={ isCoursePlayerOpen }
              courseId={ courseId }
              isIntroVideoActive={ isIntroVideoActive }
              isSectionTestActive={ isSectionTestActive }
              courseStatus={ courseStatus }
            />
          </div>
        ))}
      </List>
    </div>
  </>
)

CourseContents.defaultProps = {
  courseStatus: '',
  isIntroVideoActive: null,
  isSectionTestActive: null,
}

CourseContents.propTypes = {
  sections: sectionsPropType.isRequired,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  setOpenCoursePlayer: setOpenCoursePlayerPropType.isRequired,
  setCurrentSection: setCurrentSectionPropType.isRequired,
  setCurrentUnit: setCurrentUnitPropType.isRequired,
  isCoursePlayerOpen: isCoursePlayerOpenPropType.isRequired,
  currentSection: sectionPropType.isRequired,
  currentUnit: unitPropType.isRequired,
  courseStatus: courseStatusPropType,
  courseId: courseIdPropType.isRequired,
  isIntroVideoActive: isIntroVideoActivePropType,
  isSectionTestActive: isSectionTestActivePropType,
}
export default CourseContents
