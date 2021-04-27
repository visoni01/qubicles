/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from 'react'
import {
  Grid, IconButton, TextField, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import SectionOptions from './sectionOptions'
import AddedContent from './addedContent'
import TestSection from './Test/testSection'
import {
  addNewUnitToSection, addNewTestToSection, deleteUnitFromSection, getArticleUnitsCount,
  checkDisabledSaveSectionButton, isEmptySection, isEqualSections,
} from './helper'
import ConfirmationModal from '../../../../../../components/CommonModal/confirmationModal'

const CourseContentSection = ({
  section, updateSection, deleteSection, isEnableDelete,
}) => {
  const [ sectionDetails, setSectionDetails ] = useState(section)
  const [ openDeleteConfirmation, setOpenDeleteConfirmation ] = useState(false)
  const [ openDiscardConfirmation, setOpenDiscardConfirmation ] = useState(false)

  const handleSaveSection = useCallback(() => {
    const updatedSection = { ...sectionDetails, isEdit: false }
    updateSection({
      section: updatedSection,
    })
    setSectionDetails(updatedSection)
  }, [ updateSection, sectionDetails ])

  const handleDiscardSection = useCallback(() => {
    updateSection({
      section: { ...section, isEdit: false },
    })
    setSectionDetails({ ...section, isEdit: false })
  }, [ updateSection, section ])

  const handleEditSection = useCallback(() => {
    setSectionDetails((current) => ({ ...current, isEdit: true }))
  }, [ ])

  const handleSectionTitleChange = useCallback((val) => {
    setSectionDetails((current) => ({ ...current, title: val }))
  }, [ ])

  const handleAddUnitButton = useCallback(() => {
    const updatedSection = addNewUnitToSection({ section: sectionDetails })
    setSectionDetails(updatedSection)
  }, [ sectionDetails ])

  const handleAddTestButton = useCallback(() => {
    const updatedSection = addNewTestToSection({ section: sectionDetails })
    setSectionDetails(updatedSection)
  }, [ sectionDetails ])

  const handleDeleteUnitButton = useCallback(({ unit }) => {
    const updatedSection = deleteUnitFromSection({ section: sectionDetails, unitToDelete: unit })
    setSectionDetails(updatedSection)
  }, [ sectionDetails ])

  const handleDeleteTestButton = useCallback(() => {
    setSectionDetails((current) => ({ ...current, test: {} }))
  }, [ ])

  return (
    <div>
      <div className='list-sections border-1'>
        <div className='list-item section-label'>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <span className='para'>
                <b>
                  {`${ sectionDetails.title }`}
                </b>
              </span>
              <span className='para sz-sm light ml-10 mr-10'>
                {`(${ isEmptySection({ section }) ? 'Empty' : sectionDetails.isEdit ? 'Editing' : 'Saved' })`}
              </span>
            </Grid>
            <Grid item>
              {!sectionDetails.isEdit && (
              <IconButton
                onClick={ handleEditSection }
                disabled={ sectionDetails.isEdit }
              >
                <FontAwesomeIcon icon={ faPen } className='custom-fa-icon' />
              </IconButton>
              )}
              <span className='para'>
                {`${ getArticleUnitsCount({ section: sectionDetails }) } Units`}
              </span>
            </Grid>
          </Grid>
        </div>

        {sectionDetails.isEdit && (
          <div className='list-item edit-section'>

            <Grid container justify='space-between' alignItems='center'>
              <Grid item>
                <TextField
                  margin='dense'
                  placeholder='Section Title'
                  value={ sectionDetails.title }
                  onChange={ (e) => handleSectionTitleChange(e.target.value) }
                />
              </Grid>
              <Grid item>
                <div className='display-inline-flex align-items-center'>
                  {isEnableDelete && (
                  <div className='mr-10'>
                    <Button
                      classes={ {
                        root: 'button-secondary-small-red',
                        label: 'button-secondary-small-label',
                      } }
                      onClick={ () => setOpenDeleteConfirmation(true) }
                      disabled={ !isEnableDelete }
                    >
                      Delete Section
                    </Button>
                  </div>
                  )}
                  <div className='mr-10'>
                    <Button
                      classes={ {
                        root: 'button-secondary-small',
                        label: 'button-secondary-small-label pr-20 pl-20',
                      } }
                      onClick={ () => setOpenDiscardConfirmation(true) }
                      disabled={ isEqualSections({
                        previous: section,
                        current: sectionDetails,
                      }) }
                    >
                      Discard
                    </Button>
                  </div>
                  <div className=''>
                    <Button
                      disabled={ checkDisabledSaveSectionButton({
                        updatedSection: sectionDetails,
                      }) }
                      classes={ {
                        root: 'button-primary-small',
                        label: 'button-primary-small-label pr-35 pl-35',
                      } }
                      onClick={ handleSaveSection }
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        )}

        {/* Section Units (Audio, Video, Article) */}
        {sectionDetails.units.map((unit) => (
          <AddedContent
            key={ unit.unitId }
            unit={ unit }
            section={ sectionDetails }
            updateSection={ ({ section: updatedSection }) => setSectionDetails(updatedSection) }
            handleDeleteUnitButton={ handleDeleteUnitButton }
          />
        ))}

        {/* Section Test */}
        {!_.isEmpty(sectionDetails.test) && (
          <TestSection
            test={ sectionDetails.test }
            section={ sectionDetails }
            updateSection={ ({ section: updatedSection }) => setSectionDetails(updatedSection) }
            handleDeleteTestButton={ handleDeleteTestButton }
          />
        )}
      </div>

      {sectionDetails.isEdit && (
      <SectionOptions
        units={ sectionDetails.units }
        test={ sectionDetails.test }
        handleAddUnitButton={ handleAddUnitButton }
        handleAddTestButton={ handleAddTestButton }
      />
      )}
      {openDeleteConfirmation && (
      <ConfirmationModal
        open={ openDeleteConfirmation }
        handleClose={ () => setOpenDeleteConfirmation(false) }
        message={ `All the content of this
        section will be deleted automatically.` }
        confirmButtonText='Delete Section'
        handleConfirm={ () => deleteSection({ section }) }
      />
      )}

      {openDiscardConfirmation && (
      <ConfirmationModal
        open={ openDiscardConfirmation }
        handleClose={ () => setOpenDiscardConfirmation(false) }
        message={ `New changes will be discarded
        and section will restore it's previously saved state.` }
        confirmButtonText='Discard Changes'
        handleConfirm={ () => {
          handleDiscardSection()
          setOpenDiscardConfirmation(false)
        } }
      />
      )}
    </div>
  )
}

CourseContentSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    sectionNum: PropTypes.number.isRequired,
    sectionIsActive: PropTypes.bool.isRequired,
    units: PropTypes.arrayOf(PropTypes.any).isRequired,
    idx: PropTypes.number.isRequired,
    test: PropTypes.shape({}).isRequired,
  }).isRequired,
  isEnableDelete: PropTypes.bool.isRequired,
  deleteSection: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
}

export default CourseContentSection
