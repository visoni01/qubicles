import React, { useState, useCallback } from 'react'
import {
  Grid, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import _ from 'lodash'
import AddArticleModal from './addArticleModal'
import { updateUnitInSection } from './helper'

const AddedContent = ({
  unit, updateSection, section,
}) => {
  const [ openAddUnit, setOpenAddUnit ] = useState(false)
  const [ unitDetails, setUnitDetails ] = useState(unit)

  const saveUnitDetails = useCallback(() => {
    if (!_.isEqual(unit, unitDetails)) {
      setUnitDetails((current) => ({ ...current, isEmpty: false }))
    }
    const updatedSection = updateUnitInSection({
      section,
      updatedUnit: unitDetails,
    })
    updateSection({
      section: updatedSection,
    })
    setOpenAddUnit(false)
  }, [ unitDetails, updateSection, section, unit ])

  return (
    <div className='list-item'>
      <Grid container spacing={ 2 } justify='space-between'>
        <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 2 } container spacing={ 2 }>
          {!unitDetails.isEmpty && (
          <Grid className='align-self-center' item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 }>
            <FontAwesomeIcon className='custom-fa-icon sz-lg' icon={ faFileAlt } />
          </Grid>
          )}
          <Grid item className='text-edit' xl={ 10 } lg={ 10 } md={ 10 } sm={ 10 }>
            {/* <Input
              value={ `${ unitDetails.title }` }
              className='text-edit'
            /> */}
            <p className='para'>{unitDetails.title}</p>
          </Grid>
        </Grid>
        <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 10 } className='added-content'>
          {!unitDetails.isEmpty && (
          <span className='para light margin-left-right-10'> Article </span>
          )}
          {!unitDetails.isEmpty && (
          <IconButton>
            <FontAwesomeIcon className='custom-fa-icon sz-lg' icon={ faTrash } />
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
        </Grid>
      </Grid>
      <AddArticleModal
        open={ openAddUnit }
        onClose={ () => setOpenAddUnit(false) }
        onSubmit={ saveUnitDetails }
        unit={ unitDetails }
        setUnitDetails={ setUnitDetails }

      />
    </div>
  )
}

AddedContent.propTypes = {
  unit: PropTypes.shape({
    unitId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    unitNum: PropTypes.string.isRequired,
    sectionId: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  }).isRequired,
  updateSection: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
}

export default AddedContent
