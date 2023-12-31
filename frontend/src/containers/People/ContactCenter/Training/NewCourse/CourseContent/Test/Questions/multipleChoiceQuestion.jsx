import React, { useCallback } from 'react'
import {
  Grid, TextField, IconButton, Button, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { testQuestionPropType } from '../../../propTypes'
import { getUniqueId } from '../../../../../../../../utils/common'

const MultipleChoiceQuestion = ({ questionDetails, setQuestionDetails }) => {
  const handleOptionValueChange = useCallback(({ optionId, newValue }) => {
    setQuestionDetails((current) => {
      const updatedOptions = current.options.map((option) => {
        if (option.id === optionId) {
          return {
            ...option,
            value: newValue,
          }
        }
        return option
      })
      return ({
        ...current,
        options: updatedOptions,
      })
    })
  }, [ setQuestionDetails ])

  const handleDeleteOptionButton = useCallback(({ optionId }) => {
    setQuestionDetails((current) => {
      const updatedOptions = current.options.filter((option) => option.id !== optionId)
      return ({
        ...current,
        options: updatedOptions,
      })
    })
  }, [ setQuestionDetails ])

  const handleAddOptionButton = useCallback(() => {
    setQuestionDetails((current) => {
      const totalOptions = current.options.length
      if (totalOptions <= 5) {
        return ({
          ...current,
          options: [
            ...current.options,
            { id: getUniqueId(), value: '' },
          ],
        })
      }
      return current
    })
  }, [ setQuestionDetails ])

  const selectCorrectOption = useCallback(({ optionId }) => {
    setQuestionDetails((current) => ({
      ...current,
      correctOption: optionId,
    }))
  }, [ setQuestionDetails ])

  if (questionDetails.isSaved) {
    return (
      <div className='ml-20 pb-10'>
        {questionDetails.options.map((option) => (
          <div key={ option.id }>
            <div className='display-inline-flex align-items-center mt-5 mb-5'>
              <FontAwesomeIcon
                icon={ questionDetails.correctOption === option.id ? faCheckCircle : faDotCircle }
                className='custom-fa-icon mr-10'
              />
              <p>{option.value}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 8 } xs={ 8 }>
        <p className='para bold'>Possible Answers</p>
        {questionDetails.options.map((option, index) => (
          <div className='is-fullwidth display-inline-flex align-items-center' key={ option.id }>
            <FontAwesomeIcon icon={ faDotCircle } className='custom-fa-icon mr-10' />
            <TextField
              className='is-fullwidth'
              margin='dense'
              variant='outlined'
              value={ option.value }
              onChange={ (e) => handleOptionValueChange({ optionId: option.id, newValue: e.target.value }) }
              placeholder={ `Option ${ index + 1 }` }
            />
            <div className='ml-20'>
              <IconButton
                onClick={ () => handleDeleteOptionButton({ optionId: option.id }) }
              >
                <FontAwesomeIcon
                  icon={ faTrash }
                  className='custom-fa-icon '
                />
              </IconButton>
            </div>
          </div>
        ))}

        {questionDetails.options.length < 5 && (
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label margin-10',
          } }
          onClick={ handleAddOptionButton }
        >
          Add option
        </Button>
        )}
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 4 } className='multiple-question'>
        <p className='para bold'>Right Answers</p>
        <RadioGroup
          className='radio-buttons'
          name='visibility'
          value={ questionDetails.correctOption }
          onChange={ (e) => selectCorrectOption({ optionId: e.target.value }) }
        >
          {questionDetails.options.map((option) => (
            <div key={ option.id } className='answer-radio'>
              <FormControlLabel value={ option.id } control={ <Radio /> } />
            </div>
          ))}
        </RadioGroup>
      </Grid>
    </>
  )
}

MultipleChoiceQuestion.propTypes = {
  questionDetails: testQuestionPropType.isRequired,
  setQuestionDetails: PropTypes.func.isRequired,
}

export default MultipleChoiceQuestion
