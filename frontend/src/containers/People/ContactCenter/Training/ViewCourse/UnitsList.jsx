/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  faChevronUp, faChevronDown, faPlayCircle, faFileAlt, faFileSignature,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  List, Button,
  ListItem, ListItemIcon,
  ListItemText, Collapse, Divider,
} from '@material-ui/core'
import {
  sectionPropType, isEnrolledPropType, introVideoPropType,
  setOpenCoursePlayerPropType, setCurrentSectionPropType, setCurrentUnitPropType,
  isCoursePlayerOpenPropType, unitPropType,
} from './propTypes'

const UnitsList = ({
  section, setOpenCoursePlayer, isEnrolled, isActive, showIntroVideo, setCurrentSection, setCurrentUnit, introVideo,
  isCoursePlayerOpen, currentUnit,
}) => {
  const [ open, setOpen ] = useState(isActive)
  const handleListOpen = () => {
    setOpen(!open)
  }

  const handleUnitOpen = useCallback(({ nextSection, nextUnit }) => {
    setCurrentSection(nextSection)
    setCurrentUnit(nextUnit)
    setOpenCoursePlayer(true)
  }, [ setCurrentSection, setCurrentUnit, setOpenCoursePlayer ])

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
              <FontAwesomeIcon className='custom-fa-icon light' icon={ faPlayCircle } />
            </ListItemIcon>
            <ListItemText>
              <p className={ `para ${ isCoursePlayerOpen && currentUnit.unitId === -1 ? '' : 'light' }` }> Intro </p>
            </ListItemText>
            <Button
              classes={ {
                root: 'button-primary-text',
                label: 'button-primary-text-label',
              } }
              onClick={ () => handleUnitOpen({
                nextSection: section,
                nextUnit: {
                  title: 'Intro', type: 'Video', details: introVideo, unitId: -1,
                },
              }) }
              disabled={ (isCoursePlayerOpen && currentUnit && currentUnit.unitId === -1) }
            >
              {
                (isCoursePlayerOpen && currentUnit && currentUnit.unitId === -1 && 'Current')
                || (!isEnrolled && 'Preview')
                || (isEnrolled && 'Start')
              }
            </Button>
          </ListItem>
          )}

          {/* Units */}
          {section.units && section.units.map((unit) => (
            <ListItem key={ unit.id } className='nested-list' disableGutters>
              <ListItemIcon>
                <FontAwesomeIcon
                  className='custom-fa-icon light'
                  icon={
                    (unit.type === 'Article' && faFileAlt)
                    || (unit.type === 'Video' && faPlayCircle)
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <p className={ `para ${ isCoursePlayerOpen && currentUnit.unitId === unit.unitId ? '' : 'light' }` }>
                  {unit.title}
                </p>
              </ListItemText>
              <Button
                disabled={ !isEnrolled || (isEnrolled && section.status === '')
                || (isCoursePlayerOpen && currentUnit && unit.unitId === currentUnit.unitId) }
                classes={ {
                  root: 'button-primary-text',
                  label: 'button-primary-text-label',
                } }
                onClick={ () => handleUnitOpen({
                  nextSection: section,
                  nextUnit: unit,
                }) }
              >
                {
                  (isCoursePlayerOpen && currentUnit && unit.unitId === currentUnit.unitId && 'Current')
                  || (unit.status === 'completed' && 'Completed')
                  || (unit.status === 'inprogress' && 'Resume')
                  || (unit.status === 'abandoned' && 'Resume')
                  || (unit.status === '' && 'Start')
                }
              </Button>
            </ListItem>
          ))}

          {/* Test */}
          <ListItem className='nested-list' disableGutters>
            <ListItemIcon>
              <FontAwesomeIcon className='custom-fa-icon light' icon={ faFileSignature } />
            </ListItemIcon>
            <ListItemText>
              <p className='para light'> Test </p>
            </ListItemText>
            <Button
              disabled={ !isEnrolled || (isEnrolled && section.status === '') }
              classes={ {
                root: 'button-primary-text',
                label: 'button-primary-text-label',
              } }
            >
              Start
            </Button>
          </ListItem>
        </List>
      </Collapse>
    </>
  )
}

UnitsList.propTypes = {
  section: sectionPropType.isRequired,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  setOpenCoursePlayer: setOpenCoursePlayerPropType.isRequired,
  setCurrentSection: setCurrentSectionPropType.isRequired,
  setCurrentUnit: setCurrentUnitPropType.isRequired,
  isCoursePlayerOpen: isCoursePlayerOpenPropType.isRequired,
  currentUnit: unitPropType.isRequired,
  isActive: PropTypes.bool.isRequired,
  showIntroVideo: PropTypes.bool.isRequired,
}

export default UnitsList
