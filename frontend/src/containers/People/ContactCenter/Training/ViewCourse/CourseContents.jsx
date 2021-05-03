import React from 'react'
import { List } from '@material-ui/core'
import UnitsList from './UnitsList'
import {
  sectionsPropType, isEnrolledPropType, introVideoPropType,
  setOpenCoursePlayerPropType, setCurrentSectionPropType, setCurrentUnitPropType,
  isCoursePlayerOpenPropType, sectionPropType, unitPropType,
} from './propTypes'

const CourseContents = ({
  sections, setOpenCoursePlayer, isEnrolled, introVideo, setCurrentSection, setCurrentUnit,
  currentSection, currentUnit, isCoursePlayerOpen,
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
              setOpenCoursePlayer={ setOpenCoursePlayer }
              isEnrolled={ isEnrolled }
              isActive={ (isEnrolled && section.status === 'inprogress') || (!isEnrolled && index === 0) }
              showIntroVideo={ index === 0 && !!introVideo }
              introVideo={ introVideo }
              setCurrentSection={ setCurrentSection }
              setCurrentUnit={ setCurrentUnit }
              currentSection={ currentSection }
              currentUnit={ currentUnit }
              isCoursePlayerOpen={ isCoursePlayerOpen }
            />
          </div>
        ))}
      </List>
    </div>
  </>
)

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
}
export default CourseContents
