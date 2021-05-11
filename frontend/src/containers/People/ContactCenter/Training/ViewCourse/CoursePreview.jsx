import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line import/no-cycle
import { useDispatch } from 'react-redux'
import CourseContents from './CourseContents'
import {
  sectionsPropType, isEnrolledPropType, introVideoPropType, courseIdPropType,
  setOpenCoursePlayerPropType, setCurrentSectionPropType, setCurrentUnitPropType,
  courseTitlePropType, unitPropType, sectionPropType, currentUnitIndexPropType, currentSectionIndexPropType,
  isIntroVideoActivePropType, isSectionTestActivePropType,
} from './propTypes'
import { updateCurrentUnitAndSectionIndex, viewCourseRequestStart } from '../../../../../redux-saga/redux/people'

const CoursePreview = ({
  open, onClose, sections, courseTitle, currentSection, currentUnit, courseId, setOpenCoursePlayer,
  isEnrolled, introVideo, setCurrentSection, setCurrentUnit, currentUnitIndex, currentSectionIndex,
  isIntroVideoActive, isSectionTestActive,
}) => {
  const dispatch = useDispatch()

  const handleNextUnit = useCallback(() => {
    if (currentUnit.status !== 'completed' && currentUnit.unitId !== -1) {
      dispatch(viewCourseRequestStart({
        requestType: 'UPDATE',
        dataType: 'Course Unit',
        courseId,
        sectionId: currentSection.id,
        unitId: currentUnit.unitId,
        status: 'completed',
      }))
    }
    const nextUnitIndex = currentUnitIndex < sections[ currentSectionIndex ].units.length - 1
      ? currentUnitIndex + 1 : currentUnitIndex
    const nextSectionIndex = currentSectionIndex
    dispatch(updateCurrentUnitAndSectionIndex({
      currentUnitIndex: nextUnitIndex,
      currentSectionIndex: nextSectionIndex,
      isIntroVideoActive: false,
    }))

    if (nextUnitIndex !== currentUnitIndex) {
      dispatch(viewCourseRequestStart({
        requestType: 'UPDATE',
        dataType: 'Course Unit',
        courseId,
        sectionId: sections[ nextSectionIndex ].id,
        unitId: sections[ nextSectionIndex ].units[ nextUnitIndex ].unitId,
        status: sections[ nextSectionIndex ].units[ nextUnitIndex ].status === 'completed' ? 'completed' : 'inprogress',
      }))
    }
  }, [ dispatch, courseId, currentUnit.unitId, currentSection.id, currentUnit.status,
    currentUnitIndex, currentSectionIndex, sections ])

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ onClose }
      classes={ { paper: 'course-preview-modal' } }
      className='custom-modal'
      fullWidth
      maxWidth='lg'
    >
      <div className='display-inline-flex'>
        <div className='dialog-left-side ml-20 mr-10'>
          <h3 className='h3'> Overview </h3>
          <CourseContents
            isPreview={ false }
            setOpenCoursePlayer={ setOpenCoursePlayer }
            sections={ sections }
            courseId={ courseId }
            isEnrolled={ isEnrolled }
            introVideo={ introVideo }
            setCurrentSection={ setCurrentSection }
            setCurrentUnit={ setCurrentUnit }
            currentSection={ currentSection }
            currentUnit={ currentUnit }
            isCoursePlayerOpen
            isIntroVideoActive={ isIntroVideoActive }
            isSectionTestActive={ isSectionTestActive }
          />
        </div>
        <div className='dialog-right-side'>
          <div className='display-inline-flex justify-between no-padding-bottom'>
            <DialogTitle className='is-fullwidth'>
              <h4 className='h4 mt-10'>
                {courseTitle}
              </h4>
            </DialogTitle>
            <DialogActions className='cross-button'>
              <IconButton className='is-size-6' onClick={ onClose }>
                <FontAwesomeIcon className='custom-fa-icon' icon={ faTimes } />
              </IconButton>
            </DialogActions>
          </div>
          <DialogContent>
            <h3 className='h3 mb-10 light'>
              {`${ currentSection.title }: `}
              <span className='h3'>
                {(currentUnit && currentUnit.title) || (isIntroVideoActive && 'Intro')}
              </span>
            </h3>
            {(currentUnit.type === 'Video' || isIntroVideoActive) && (
            <div className='post-image'>
              <img alt={ currentUnit.title } src='https://picsum.photos/896/480' />
            </div>
            )}
            {currentUnit.type === 'Article' && (
            <div className='para sz-xl'>
              {currentUnit.details}
            </div>
            )}

          </DialogContent>
          {isEnrolled && (
          <DialogActions className='modal-actions'>
            <Button
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Previous
            </Button>
            <Button
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ handleNextUnit }
            >
              Next
            </Button>
          </DialogActions>
          )}
        </div>
      </div>

    </Dialog>
  )
}

CoursePreview.defaultProps = {
  currentUnitIndex: null,
  currentSectionIndex: null,
  isIntroVideoActive: null,
  isSectionTestActive: null,
}

CoursePreview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sections: sectionsPropType.isRequired,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  setOpenCoursePlayer: setOpenCoursePlayerPropType.isRequired,
  setCurrentSection: setCurrentSectionPropType.isRequired,
  setCurrentUnit: setCurrentUnitPropType.isRequired,
  courseTitle: courseTitlePropType.isRequired,
  currentUnit: unitPropType.isRequired,
  currentSection: sectionPropType.isRequired,
  courseId: courseIdPropType.isRequired,
  currentUnitIndex: currentUnitIndexPropType,
  currentSectionIndex: currentSectionIndexPropType,
  isIntroVideoActive: isIntroVideoActivePropType,
  isSectionTestActive: isSectionTestActivePropType,
}

export default CoursePreview
