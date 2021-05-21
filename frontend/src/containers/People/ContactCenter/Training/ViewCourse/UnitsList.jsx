/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {
  faChevronUp, faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  List, Button,
  ListItem, ListItemIcon,
  ListItemText, Collapse, Divider,
} from '@material-ui/core'
import {
  sectionPropType, isEnrolledPropType, introVideoPropType,
  setOpenCoursePlayerPropType, isCoursePlayerOpenPropType, unitPropType, courseIdPropType,
  isIntroVideoActivePropType, sectionIndexPropType, courseStatusPropType, typePropType,
} from './propTypes'
import { viewCourseRequestStart, updateCurrentUnitAndSectionIndex } from '../../../../../redux-saga/redux/people'
import { ArticleIcon, TestIcon, VideoIcon } from '../../../../../assets/images/training'

const UnitsList = ({
  section, setOpenCoursePlayer, isEnrolled, isActive, showIntroVideo, introVideo,
  isCoursePlayerOpen, currentUnit, courseId, currentSection, sectionIndex,
  isIntroVideoActive, courseStatus, type,
}) => {
  const [ open, setOpen ] = useState(isActive)
  const dispatch = useDispatch()

  useEffect(() => {
    setOpen(isActive)
  }, [ isActive ])

  const handleListOpen = useCallback(() => {
    setOpen(!open)
  }, [ setOpen, open ])

  const handleUnitOpen = useCallback(({ nextSection, nextUnit }) => {
    if (nextUnit.index === -2) {
      dispatch(updateCurrentUnitAndSectionIndex({
        currentSectionIndex: sectionIndex,
        currentUnitIndex: -2,
        isIntroVideoActive: false,
        isSectionTestActive: true,
      }))
      setOpenCoursePlayer(true)
      return
    }
    if (nextUnit.index === -1) {
      dispatch(updateCurrentUnitAndSectionIndex({
        currentSectionIndex: 0,
        currentUnitIndex: -1,
        isIntroVideoActive: true,
      }))
      setOpenCoursePlayer(true)
      return
    }
    dispatch(updateCurrentUnitAndSectionIndex({
      currentUnitIndex: nextUnit.index,
      currentSectionIndex: sectionIndex,
      isIntroVideoActive: false,
    }))
    if (!_.isEmpty(currentUnit) && currentUnit.unitId > 0 && currentUnit.status !== 'completed') {
      dispatch(viewCourseRequestStart({
        requestType: 'UPDATE',
        dataType: 'Course Unit',
        courseId,
        sectionId: currentSection.id,
        unitId: currentUnit.unitId,
        status: (nextUnit.status === 'completed' && currentUnit.status)
        || (currentUnit.status === 'completed' ? 'completed' : 'abandoned'),
      }))
    }
    if (nextUnit.status !== 'completed' || _.isEmpty(nextUnit.details)) {
      dispatch(viewCourseRequestStart({
        requestType: 'UPDATE',
        dataType: 'Course Unit',
        courseId,
        sectionId: nextSection.id,
        unitId: nextUnit.unitId,
        status: nextUnit.status === 'completed' ? 'completed' : 'inprogress',
      }))
    }
    setOpenCoursePlayer(true)
  }, [ setOpenCoursePlayer, courseId, currentUnit, dispatch, currentSection, sectionIndex ])

  return (
    <>
      <ListItem button onClick={ handleListOpen }>
        <ListItemIcon>
          {open
            ? <FontAwesomeIcon className='custom-fa-icon' icon={ faChevronUp } />
            : <FontAwesomeIcon className='custom-fa-icon' icon={ faChevronDown } />}
        </ListItemIcon>
        <ListItemText>
          <h4 className='h4'>{section.title}</h4>
        </ListItemText>
        <p className='para'>
          {`${ section.units && showIntroVideo ? section.units.length + 1 : section.units.length } units`}
        </p>
      </ListItem>
      <Divider />
      <Collapse in={ open } timeout='auto' unmountOnExit>
        <List component='div'>

          {/* Intro Video */}
          {showIntroVideo && (
          <ListItem className='nested-list' disableGutters>
            <ListItemIcon>
              <VideoIcon />
            </ListItemIcon>
            <ListItemText>
              <p className={ `para ${ isCoursePlayerOpen && isIntroVideoActive ? '' : 'light' }` }> Intro </p>
            </ListItemText>
            <Button
              classes={ {
                root: 'button-primary-text',
                label: 'button-primary-text-label',
              } }
              onClick={ () => handleUnitOpen({
                nextSection: section,
                nextUnit: {
                  title: 'Intro', type: 'Video', details: introVideo, unitId: -1, index: -1,
                },
              }) }
              disabled={ (isCoursePlayerOpen && currentUnit && isIntroVideoActive) }
            >
              {
                (isCoursePlayerOpen && currentUnit && isIntroVideoActive && 'Current')
                || 'Preview'
              }
            </Button>
          </ListItem>
          )}

          {/* Units */}
          {section.units && section.units.map((unit, index) => (
            <ListItem key={ unit.id } className='nested-list' disableGutters>
              <ListItemIcon>
                {(unit.type === 'Article' && <ArticleIcon />)
                  || (unit.type === 'Video' && <VideoIcon />)}
              </ListItemIcon>
              <ListItemText>
                <p className={ `para ${ isCoursePlayerOpen && currentUnit.unitId === unit.unitId ? '' : 'light' }` }>
                  {unit.title}
                </p>
              </ListItemText>
              <Button
                disabled={ !isEnrolled
                || (isEnrolled && section.status === '' && courseStatus === 'inprogress' && sectionIndex !== 0
                  && !isActive && !isCoursePlayerOpen)
                || (isEnrolled && section.status === '' && courseStatus === 'inprogress' && sectionIndex !== 0
                  && !isActive && section.units[ 0 ].status === '' && isCoursePlayerOpen)
                || (isEnrolled && section.status === '' && courseStatus === 'enrolled')
                || (isCoursePlayerOpen && currentUnit && unit.unitId === currentUnit.unitId) }
                classes={ {
                  root: 'button-primary-text',
                  label: 'button-primary-text-label',
                } }
                onClick={ () => handleUnitOpen({
                  nextSection: section,
                  nextUnit: { ...unit, index },
                }) }
              >
                {
                  (type === 'preview' && ' ')
                  || (isCoursePlayerOpen && currentUnit && unit.unitId === currentUnit.unitId && 'Current')
                  || (unit.status === 'completed' && 'Completed')
                  || (unit.status === 'inprogress' && 'Resume')
                  || (unit.status === 'abandoned' && 'Resume')
                  || (unit.status === '' && 'Start')
                }
              </Button>
            </ListItem>
          ))}

          {/* Test */}
          {((section && section.test && !_.isEmpty(section.test) && type === 'preview') || (type !== 'preview')) && (
          <ListItem className='nested-list' disableGutters>
            <ListItemIcon>
              <TestIcon />
            </ListItemIcon>
            <ListItemText>
              <p className='para light'> Test </p>
            </ListItemText>
            <Button
              disabled={ !isEnrolled
                || (isEnrolled && section.status === '' && courseStatus === 'inprogress' && sectionIndex !== 0
                  && !isActive && !isCoursePlayerOpen)
                || (isEnrolled && section.status === '' && courseStatus === 'inprogress' && sectionIndex !== 0
                  && !isActive && section.units[ 0 ].status === '' && isCoursePlayerOpen)
                || (isEnrolled && section.status === '' && courseStatus === 'enrolled')
                || (currentUnit.unitId === -2 && isCoursePlayerOpen)
                || section.status === 'completed' }
              classes={ {
                root: 'button-primary-text',
                label: 'button-primary-text-label',
              } }
              onClick={ () => handleUnitOpen({
                nextSection: section,
                nextUnit: {
                  title: 'Test', type: 'Test', details: '', unitId: -2, index: -2,
                },
              }) }
            >
              {
                (type === 'preview' && ' ')
                || (isCoursePlayerOpen && currentUnit && currentUnit.unitId === -2 && currentSection.id === section.id
                   && 'Current')
                || (section.status === 'completed' && 'Completed')
                || 'Start'
              }
            </Button>
          </ListItem>
          )}
        </List>
      </Collapse>
    </>
  )
}

UnitsList.defaultProps = {
  isIntroVideoActive: null,
  type: 'view',
}

UnitsList.propTypes = {
  section: sectionPropType.isRequired,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  setOpenCoursePlayer: setOpenCoursePlayerPropType.isRequired,
  isCoursePlayerOpen: isCoursePlayerOpenPropType.isRequired,
  currentUnit: unitPropType.isRequired,
  currentSection: sectionPropType.isRequired,
  isActive: PropTypes.bool.isRequired,
  showIntroVideo: PropTypes.bool.isRequired,
  courseId: courseIdPropType.isRequired,
  isIntroVideoActive: isIntroVideoActivePropType,
  sectionIndex: sectionIndexPropType.isRequired,
  courseStatus: courseStatusPropType.isRequired,
  type: typePropType,
}

export default UnitsList
