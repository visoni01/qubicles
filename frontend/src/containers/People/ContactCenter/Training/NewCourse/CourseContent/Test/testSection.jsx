import React, { useState, useCallback } from 'react'
import {
  Grid, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import TestQuestionModal from './testQuestionModal'
import ConfirmationModal from '../../../../../../../components/CommonModal/confirmationModal'
import { updateUnitInSection } from '../helper'

const TestSection = ({
  unit, updateSection, section, handleDeleteUnitButton,
}) => {
  const [ openTest, setOpenTest ] = useState(unit.isOpen)
  const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false)
  const [ unitDetails, setUnitDetails ] = useState(unit)

  const saveUnitDetails = useCallback(() => {
    let updatedUnit = unitDetails
    setUnitDetails((current) => {
      updatedUnit = { ...current, isEmpty: false, isOpen: false }
      return (updatedUnit)
    })

    const updatedSection = updateUnitInSection({
      section,
      updatedUnit,
    })

    updateSection({
      section: updatedSection,
    })

    setOpenTest(false)
  }, [ unitDetails, updateSection, section, setOpenTest ])

  const handleCancelUnitChanges = useCallback(() => {
    setUnitDetails({ ...unit, isOpen: false })
    if (unitDetails.isEmpty) {
      handleDeleteUnitButton({ unit })
    }
    setOpenTest(false)
  }, [ unit, setOpenTest, handleDeleteUnitButton, unitDetails.isEmpty ])

  return (
    <>
      <div className='list-item'>
        <Grid container spacing={ 2 } justify='space-between'>
          <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 2 } container spacing={ 2 }>
            <Grid className='align-self-center' item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 }>
              <FontAwesomeIcon className='custom-fa-icon sz-lg' icon={ faFlask } />
            </Grid>
            <Grid item className='text-edit' xl={ 10 } lg={ 10 } md={ 10 } sm={ 10 }>
              <p className='para'>{unitDetails.title}</p>
            </Grid>
          </Grid>
          <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 10 } className='added-content'>
            <span className='para light margin-left-right-10'> Test </span>
            <IconButton onClick={ () => setOpenConfirmDelete(true) }>
              <FontAwesomeIcon className='custom-fa-icon sz-lg' icon={ faTrash } />
            </IconButton>
            <Button
              className='edit-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ () => setOpenTest(true) }
            >
              Questions
            </Button>
          </Grid>
        </Grid>
      </div>
      <TestQuestionModal
        open={ openTest }
        onClose={ handleCancelUnitChanges }
        onSubmit={ saveUnitDetails }
        unitDetails={ unitDetails }
        setUnitDetails={ setUnitDetails }
      />
      <ConfirmationModal
        open={ openConfirmDelete }
        handleClose={ () => setOpenConfirmDelete(false) }
        message='Are you sure you want to delete this test ?'
        confirmButtonText='Delete'
        handleConfirm={ () => handleDeleteUnitButton({ unit }) }
      />
    </>
  )
}

TestSection.propTypes = {
  unit: PropTypes.shape({
    unitId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    unitNum: PropTypes.string.isRequired,
    sectionId: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.any).isRequired,
    length: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  updateSection: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  handleDeleteUnitButton: PropTypes.func.isRequired,
}

export default TestSection
