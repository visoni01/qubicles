import React, { useEffect, useState } from 'react'
import CourseContents from '../../../../../components/People/ContactCenter/Training/ViewCourse/CourseContents'
import CoursePreview from './CoursePreview'
import {
  sectionsPropType, courseIdPropType, isEnrolledPropType, introVideoPropType, courseTitlePropType, dataTypePropType,
  courseStatusPropType, setOpenCoursePlayerPropType, currentUnitIndexPropType, currentSectionIndexPropType,
  isIntroVideoActivePropType, isSectionTestActivePropType, openCoursePlayerPropType, typePropType, isLoadingPropType,
} from './propTypes'

export default function CourseContentWrap({
  sections, courseId, isEnrolled, introVideo, courseTitle, courseStatus, openCoursePlayer, setOpenCoursePlayer,
  currentUnitIndex, currentSectionIndex, isIntroVideoActive, isSectionTestActive, type, isLoading, dataType,
}) {
  const [ currentSection, setCurrentSection ] = useState({})
  const [ currentUnit, setCurrentUnit ] = useState({})

  useEffect(() => {
    if (currentUnitIndex !== null && currentUnitIndex >= 0) {
      setCurrentUnit(sections[ currentSectionIndex ].units[ currentUnitIndex ])
    } else if (currentUnitIndex !== null && currentUnitIndex === -1) {
      setCurrentUnit({
        title: 'Intro', type: 'Video', details: introVideo, unitId: -1, index: -1,
      })
    } else if (currentUnitIndex !== null && currentUnitIndex === -2) {
      setCurrentUnit({
        title: 'Test', type: 'Test', details: '', unitId: -2, index: -2,
      })
    } else {
      setCurrentUnit({})
    }
    if (currentSectionIndex !== null) {
      setCurrentSection(sections[ currentSectionIndex ])
    }
  }, [ sections, currentSectionIndex, currentUnitIndex, introVideo ])

  return (
    <>
      <CourseContents
        setOpenCoursePlayer={ setOpenCoursePlayer }
        sections={ sections }
        courseId={ courseId }
        isEnrolled={ isEnrolled }
        introVideo={ introVideo }
        setCurrentSection={ setCurrentSection }
        setCurrentUnit={ setCurrentUnit }
        courseStatus={ courseStatus }
        currentSection={ currentSection }
        currentUnit={ currentUnit }
        isIntroVideoActive={ isIntroVideoActive }
        isSectionTestActive={ isSectionTestActive }
        type={ type }
      />
      <CoursePreview
        open={ openCoursePlayer }
        onClose={ () => setOpenCoursePlayer(false) }
        onSubmit={ () => setOpenCoursePlayer(false) }
        sections={ sections }
        courseId={ courseId }
        courseTitle={ courseTitle }
        currentSection={ currentSection }
        currentUnit={ currentUnit }
        isEnrolled={ isEnrolled }
        introVideo={ introVideo }
        setCurrentSection={ setCurrentSection }
        setCurrentUnit={ setCurrentUnit }
        setOpenCoursePlayer={ setOpenCoursePlayer }
        currentSectionIndex={ currentSectionIndex }
        currentUnitIndex={ currentUnitIndex }
        isIntroVideoActive={ isIntroVideoActive }
        isSectionTestActive={ isSectionTestActive }
        courseStatus={ courseStatus }
        dataType={ dataType }
        isLoading={ isLoading }
      />
    </>
  )
}

CourseContentWrap.defaultProps = {
  courseStatus: '',
  currentUnitIndex: null,
  currentSectionIndex: null,
  isIntroVideoActive: null,
  isSectionTestActive: null,
  openCoursePlayer: false,
  type: 'view',
}

CourseContentWrap.propTypes = {
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
  isLoading: isLoadingPropType.isRequired,
  type: typePropType,
  dataType: dataTypePropType.isRequired,
}
