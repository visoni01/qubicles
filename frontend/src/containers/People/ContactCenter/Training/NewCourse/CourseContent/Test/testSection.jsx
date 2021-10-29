import React, { useState, useCallback } from 'react'
import { Grid, IconButton, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import TestQuestionModal from './testQuestionModal'
import ConfirmationModal from '../../../../../../../components/CommonModal/confirmationModal'
import { testPropType } from '../../propTypes'
import { DeleteIcon, TestIcon } from '../../../../../../../assets/images/training'

const TestSection = ({
  test, updateSection, section, handleDeleteTestButton,
}) => {
  const [ openTest, setOpenTest ] = useState(test.isOpen)
  const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false)
  const [ testDetails, setTestDetails ] = useState(test)

  const saveTestDetails = useCallback(() => {
    let updatedTest = testDetails
    setTestDetails((current) => {
      updatedTest = { ...current, isEmpty: false, isOpen: false }
      return (updatedTest)
    })

    updateSection({
      section: { ...section, test: updatedTest },
    })

    setOpenTest(false)
  }, [ testDetails, updateSection, section, setOpenTest ])

  const handleCancelUnitChanges = useCallback(() => {
    setTestDetails({ ...test, isOpen: false })
    if (testDetails.isEmpty) {
      handleDeleteTestButton()
    }
    setOpenTest(false)
  }, [ test, setOpenTest, handleDeleteTestButton, testDetails.isEmpty ])

  return (
    <>
      <div className='list-item'>
        <Grid container spacing={ 2 } justify='space-between' alignItems='center'>
          <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 2 } container spacing={ 2 }>
            <Grid className='align-self-center' item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 }>
              <TestIcon />
            </Grid>
            <Grid item className='text-edit' xl={ 10 } lg={ 10 } md={ 10 } sm={ 10 }>
              <p className='para'>{testDetails.title}</p>
            </Grid>
          </Grid>
          <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 10 } className='added-content'>
            <span className='para light margin-left-right-10'> Test </span>
            {section.isEdit && (
              <>
                <IconButton onClick={ () => setOpenConfirmDelete(true) }>
                  <DeleteIcon />
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
              </>
            )}
          </Grid>
        </Grid>
      </div>

      <TestQuestionModal
        open={ openTest }
        onClose={ handleCancelUnitChanges }
        onSubmit={ saveTestDetails }
        testDetails={ testDetails }
        setTestDetails={ setTestDetails }
      />

      {openConfirmDelete && (
        <ConfirmationModal
          open={ openConfirmDelete }
          handleClose={ () => setOpenConfirmDelete(false) }
          message='Are you sure you want to delete this test ?'
          confirmButtonText='Delete'
          handleConfirm={ () => handleDeleteTestButton() }
        />
      )}
    </>
  )
}

TestSection.propTypes = {
  test: testPropType.isRequired,
  updateSection: PropTypes.func.isRequired,
  section: PropTypes.shape({
    isEdit: PropTypes.bool.isRequired,
  }).isRequired,
  handleDeleteTestButton: PropTypes.func.isRequired,
}

export default TestSection
