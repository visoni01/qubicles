/* eslint-disable complexity */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import CourseContents from '../../../../../components/People/ContactCenter/Training/ViewCourse/CourseContents'
import {
  sectionsPropType, isEnrolledPropType, introVideoPropType, courseIdPropType, setOpenCoursePlayerPropType,
  setCurrentSectionPropType, setCurrentUnitPropType, dataTypePropType, courseTitlePropType, unitPropType,
  sectionPropType, currentUnitIndexPropType, currentSectionIndexPropType, isIntroVideoActivePropType,
  isSectionTestActivePropType, courseStatusPropType, isLoadingPropType, isCreatorPropType,
} from './propTypes'
import { updateCurrentUnitAndSectionIndex, viewCourseRequestStart } from '../../../../../redux-saga/redux/people'
import SectionTest from './sectionTest'
import ViewCourseUnitSkeleton from
  '../../../../../components/People/ContactCenter/SkeletonLoader/Training/viewCourseUnitSkeleton'
import MediaPlayer from './mediaPlayer'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const CoursePreview = ({
  open, onClose, sections, courseTitle, currentSection, currentUnit, courseId, setOpenCoursePlayer, isEnrolled,
  introVideo, setCurrentSection, setCurrentUnit, currentUnitIndex, currentSectionIndex, isIntroVideoActive,
  isSectionTestActive, courseStatus, isLoading, dataType, isCreator,
}) => {
  const dispatch = useDispatch()

  const handlePreviousUnit = useCallback(() => {
    if (currentUnit.status !== 'completed' && currentUnit.unitId > 0 && !isCreator) {
      dispatch(viewCourseRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: 'Course Unit',
        courseId,
        sectionId: currentSection.id,
        unitId: currentUnit.unitId,
        status: sections[ currentSectionIndex ].units[ currentUnitIndex - 1 ].status === 'completed'
          ? currentUnit.status
          : 'abandoned',
      }))
    }

    dispatch(updateCurrentUnitAndSectionIndex({
      currentUnitIndex: currentUnitIndex - 1,
      currentSectionIndex,
      isIntroVideoActive: false,
    }))

    if ((sections[ currentSectionIndex ].units[ currentUnitIndex - 1 ].status !== 'completed'
      || _.isEmpty(sections[ currentSectionIndex ].units[ currentUnitIndex - 1 ].details))
      && !isCreator) {
      dispatch(viewCourseRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: 'Course Unit',
        courseId,
        sectionId: currentSection.id,
        unitId: sections[ currentSectionIndex ].units[ currentUnitIndex - 1 ].unitId,
        status: sections[ currentSectionIndex ].units[ currentUnitIndex - 1 ].status === 'completed'
          ? 'completed'
          : 'inprogress',
      }))
    }
  }, [ dispatch, courseId, currentUnit.unitId, currentSection.id, currentUnit.status,
    currentUnitIndex, currentSectionIndex, sections, isCreator ])

  const handleNextUnit = useCallback(() => {
    let nextUnitIndex = currentUnitIndex < sections[ currentSectionIndex ].units.length - 1 && currentUnitIndex !== -2
      ? currentUnitIndex + 1 : -2
    let nextSectionIndex = currentSectionIndex
    if (sections[ currentSectionIndex ].status === 'completed'
      && sections[ currentSectionIndex ].units.length - 1 === currentUnitIndex) {
      nextUnitIndex = 0
      nextSectionIndex = currentSectionIndex < sections.length - 1 ? currentSectionIndex + 1 : 0
    }
    if (currentUnit.status !== 'completed' && currentUnit.unitId > 0 && !isCreator) {
      dispatch(viewCourseRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: 'Course Unit',
        courseId,
        sectionId: currentSection.id,
        unitId: currentUnit.unitId,
        status: 'completed',
      }))
    }
    dispatch(updateCurrentUnitAndSectionIndex({
      currentUnitIndex: nextUnitIndex,
      currentSectionIndex: nextSectionIndex,
      isIntroVideoActive: false,
    }))

    if ((nextUnitIndex !== currentUnitIndex || nextSectionIndex !== currentSectionIndex) && nextUnitIndex >= 0
        && (sections[ nextSectionIndex ].units[ nextUnitIndex ].status !== 'completed'
          || _.isEmpty(sections[ nextSectionIndex ].units[ nextUnitIndex ].details))
        && !isCreator) {
      dispatch(viewCourseRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: 'Course Unit',
        courseId,
        sectionId: sections[ nextSectionIndex ].id,
        unitId: sections[ nextSectionIndex ].units[ nextUnitIndex ].unitId,
        status: sections[ nextSectionIndex ].units[ nextUnitIndex ].status === 'completed' ? 'completed' : 'inprogress',
      }))
    }
  }, [ dispatch, courseId, currentUnit.unitId, currentSection.id, currentUnit.status,
    currentUnitIndex, currentSectionIndex, sections, isCreator ])

  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      classes={ { paper: 'course-preview-modal' } }
      className='custom-modal'
      fullWidth
      maxWidth='lg'
    >
      <div className='display-inline-flex'>
        <div className='dialog-left-side ml-20 mr-10'>
          <h3 className='h3 mb-20'> Overview </h3>
          <div className='course-contents'>
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
              courseStatus={ courseStatus }
              isCreator={ isCreator }
            />
          </div>
        </div>
        <div className='dialog-right-side'>
          {open && !isLoading && (
          <div className='display-inline-flex justify-between no-padding-bottom'>
            <DialogTitle className='is-fullwidth'>
              <p className='h4 mt-10'>
                {courseTitle}
              </p>
            </DialogTitle>
            <DialogActions className='cross-button'>
              <IconButton className='is-size-6' onClick={ onClose }>
                <FontAwesomeIcon className='custom-fa-icon' icon={ faTimes } />
              </IconButton>
            </DialogActions>
          </div>
          )}
          <DialogContent>
            {open && !isLoading && (
            <h3 className='h3 mb-10 light'>
              {`${ currentSection.title }: `}
              <span className='h3'>
                {(currentUnit && currentUnit.title) || (isIntroVideoActive && 'Intro')}
              </span>
            </h3>
            )}
            <div className='course-content-area pr-10'>
              {open && !isLoading && (currentUnit.type === 'Video' || isIntroVideoActive) && (
                <div className='course-content-video'>
                  <MediaPlayer source={ isIntroVideoActive ? introVideo : currentUnit.details } type='video' />
                </div>
              )}
              {open && !isLoading && currentUnit.type === 'Article' && (
              <div
                className='para sz-xl text-align-justify'
              // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={ { __html: currentUnit.details } }
              />
              )}
              {open && !isLoading && currentUnit.type === 'Audio' && (
              <MediaPlayer
                source={ currentUnit.details }
                type='audio'
              />
              )}
              {currentUnit.type === 'Test' && (
              <SectionTest
                courseId={ courseId }
                sectionId={ currentSection.id }
              />
              )}
              {open && isLoading && _.isEqual(dataType, 'Course Unit') && (
              <ViewCourseUnitSkeleton />
              )}
            </div>
          </DialogContent>

          {open && !isLoading
          && ((isEnrolled && [ 'inprogress', 'completed' ].includes(courseStatus)) || isCreator)
          && currentUnit.unitId !== -2 && (
            <DialogActions className='modal-actions course-content-buttons'>
              {!_.isNull(currentSectionIndex) && !_.isUndefined(sections[ currentSectionIndex ].units)
              && !(
                _.isEqual(currentSectionIndex, sections.length - 1)
                && _.isEqual(currentSection.status, 'completed')
                && _.isEqual(currentUnitIndex, sections[ currentSectionIndex ].units.length - 1)
                && _.isEqual(sections[ currentSectionIndex ].units[ currentUnitIndex ].status, 'completed')
              )
              && (
                <Button
                  classes={ {
                    root: 'button-primary-small',
                    label: 'button-primary-small-label',
                  } }
                  onClick={ handleNextUnit }
                >
                  Next
                </Button>
              )}
              {currentUnitIndex > 0 && (
              <Button
                classes={ {
                  root: 'button-secondary-small',
                  label: 'button-secondary-small-label',
                } }
                className='previous-button'
                onClick={ handlePreviousUnit }
              >
                Previous
              </Button>
              )}
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
  isCreator: false,
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
  courseStatus: courseStatusPropType.isRequired,
  dataType: dataTypePropType.isRequired,
  isLoading: isLoadingPropType.isRequired,
  isCreator: isCreatorPropType,
}

export default CoursePreview
