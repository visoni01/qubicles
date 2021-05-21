import React, { useState, useCallback } from 'react'
import {
  Grid, IconButton, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import AddArticleModal from './addArticleModal'
import { updateUnitInSection } from './helper'
import ConfirmationModal from '../../../../../../components/CommonModal/confirmationModal'
import { unitPropType } from '../propTypes'
import { ArticleIcon, DeleteIcon } from '../../../../../../assets/images/training'

const AddedContent = ({
  unit, updateSection, section, handleDeleteUnitButton,
}) => {
  const [ openAddUnit, setOpenAddUnit ] = useState(unit.isOpen)
  const [ unitDetails, setUnitDetails ] = useState(unit)
  const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false)

  const saveUnitDetails = useCallback(() => {
    let updatedUnit = unitDetails
    if (!_.isEqual(unit, updatedUnit)) {
      setUnitDetails((current) => {
        updatedUnit = {
          ...current,
          title: current.title.trim(),
          isEmpty: false,
          isOpen: false,
        }
        return (updatedUnit)
      })
    }

    const updatedSection = updateUnitInSection({
      section,
      updatedUnit,
    })

    updateSection({
      section: updatedSection,
    })
    setOpenAddUnit(false)
  }, [ unitDetails, updateSection, section, unit ])

  const handleCancelUnitChanges = useCallback(() => {
    setUnitDetails({ ...unit, isOpen: false })
    if (unitDetails.isEmpty) {
      handleDeleteUnitButton({ unit })
    }
    setOpenAddUnit(false)
  }, [ unit, handleDeleteUnitButton, unitDetails.isEmpty ])

  return (
    <div className='list-item'>
      <Grid container spacing={ 2 } justify='space-between' alignItems='center'>
        <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 2 } container spacing={ 2 }>
          {!unitDetails.isEmpty && (
          <Grid className='align-self-center' item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 }>
            <ArticleIcon />
          </Grid>
          )}
          <Grid item className='text-edit' xl={ 10 } lg={ 10 } md={ 10 } sm={ 10 }>
            <p className='para'>{unitDetails.title}</p>
          </Grid>
        </Grid>
        <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 10 } className='added-content'>
          {!unitDetails.isEmpty && (
          <span className='para light margin-left-right-10'> Article </span>
          )}
          {section.isEdit && (
          <>
            {!unitDetails.isEmpty && (
            <IconButton onClick={ () => setOpenConfirmDelete(true) }>
              <DeleteIcon />
            </IconButton>
            )}
            <Button
              className='edit-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ () => setOpenAddUnit(true) }
            >
              {unitDetails.isEmpty ? 'Add Content' : 'Edit'}
            </Button>
          </>
          )}
        </Grid>
      </Grid>
      <AddArticleModal
        title={ unitDetails.isEmpty ? 'New Article' : 'Edit Article' }
        open={ openAddUnit }
        onClose={ handleCancelUnitChanges }
        onSubmit={ saveUnitDetails }
        unit={ unitDetails }
        savedUnit={ unit }
        setUnitDetails={ setUnitDetails }
      />
      {openConfirmDelete && (
      <ConfirmationModal
        open={ openConfirmDelete }
        handleClose={ () => setOpenConfirmDelete(false) }
        message='Are you sure you want to delete this unit ?'
        confirmButtonText='Delete'
        handleConfirm={ () => handleDeleteUnitButton({ unit }) }
      />
      )}
    </div>
  )
}

AddedContent.propTypes = {
  unit: unitPropType.isRequired,
  updateSection: PropTypes.func.isRequired,
  section: PropTypes.shape({
    isEdit: PropTypes.bool.isRequired,
  }).isRequired,
  handleDeleteUnitButton: PropTypes.func.isRequired,
}

export default AddedContent
